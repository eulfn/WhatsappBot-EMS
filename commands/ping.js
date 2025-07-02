module.exports = {
    name: 'ping',
    aliases: [],
    description: 'Replies with Pong! and latency.',
    usage: '!ping',
    async execute(sock, msg, args, info) {
        const start = Date.now();
        await sock.sendMessage(msg.key.remoteJid, { text: 'Pong!' });
        const latency = Date.now() - start;
        await sock.sendMessage(msg.key.remoteJid, { text: `Latency: ${latency}ms` });
        return 'pong';
    },
}; 