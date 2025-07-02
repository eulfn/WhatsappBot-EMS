module.exports = {
    name: 'owner',
    aliases: [],
    description: "Shows owner's contact info.",
    usage: '!owner',
    async execute(sock, m, a, ctx) {
        const { cfg } = ctx;
        await sock.sendMessage(m.key.remoteJid, { text: `Owner: wa.me/${cfg.ownerNumber.replace(/[^0-9]/g, '')}` });
        return 'owner';
    },
}; 