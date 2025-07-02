const chalk = require('chalk');

const pre = [
    async (m, ctx) => {
        console.log(chalk.blue(`[PRE] Msg from ${m.key.remoteJid}: ${m.message?.conversation || ''}`));
        // You can add anti-spam, filtering, etc. here
        return true;
    }
];

const post = [
    async (m, ctx, res) => {
        console.log(chalk.magenta(`[POST] Cmd result: ${res}`));
    }
];

module.exports = { pre, post }; 