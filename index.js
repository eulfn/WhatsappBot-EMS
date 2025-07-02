const { default: Auth, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const cfg = require('./config');

// Welcome Banner
console.log(chalk.green(figlet.textSync(cfg.botName)));

// Command and Event Collections
const cmds = new Map();
const als = new Map();
const evs = new Map();

// Middleware arrays
const pre = [];
const post = [];

// Load Commands
const cPath = path.join(__dirname, 'commands');
if (fs.existsSync(cPath)) {
    fs.readdirSync(cPath).forEach(f => {
        if (f.endsWith('.js')) {
            const cmd = require(path.join(cPath, f));
            cmds.set(cmd.name, cmd);
            if (cmd.aliases) cmd.aliases.forEach(a => als.set(a, cmd.name));
        }
    });
}

// Load Events
const ePath = path.join(__dirname, 'events');
if (fs.existsSync(ePath)) {
    fs.readdirSync(ePath).forEach(f => {
        if (f.endsWith('.js')) {
            const ev = require(path.join(ePath, f));
            evs.set(ev.event, ev.handler);
        }
    });
}

// Load Middleware (optional, can be extended)
const mPath = path.join(__dirname, 'middleware.js');
if (fs.existsSync(mPath)) {
    const m = require(mPath);
    if (m.pre) pre.push(...m.pre);
    if (m.post) post.push(...m.post);
}

async function Go() {
    const { state, saveCreds } = await useMultiFileAuthState(cfg.sessionPath);
    const { version } = await fetchLatestBaileysVersion();
    const sock = Auth({
        version,
        auth: state,
        printQRInTerminal: true,
        logger: { level: 'warn' },
        syncFullHistory: false,
    });

    sock.ev.on('creds.update', saveCreds);

    // Register events
    for (const [ev, fn] of evs) {
        sock.ev.on(ev, (...a) => fn(sock, ...a, { cmds, als, cfg, pre, post }));
    }

    sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
        if (connection === 'close') {
            const again = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(chalk.red('Connection closed. Reconnecting...'), again);
            if (again) Go();
        } else if (connection === 'open') {
            console.log(chalk.green('Bot is online!'));
        }
    });
}

Go().catch(e => {
    console.error(chalk.red('Failed to start bot:'), e);
}); 