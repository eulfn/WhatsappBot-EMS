module.exports = {
    name: 'menu',
    aliases: ['help'],
    description: 'Lists all available commands.',
    usage: '!menu',
    async execute(sock, m, a, ctx) {
        const { cmds, cfg } = ctx;
        let txt = `*${cfg.botName} Command Menu*\n\n`;
        for (const [n, c] of cmds) {
            txt += `*${cfg.prefix}${c.name}* - ${c.description}\nUsage: ${c.usage}\n\n`;
        }
        await sock.sendMessage(m.key.remoteJid, { text: txt });
        return 'menu';
    },
}; 