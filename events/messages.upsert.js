const chalk = require('chalk');

module.exports = {
    event: 'messages.upsert',
    handler: async (sock, data, ctx) => {
        try {
            const m = data.messages && data.messages[0];
            if (!m || !m.message || m.key.fromMe) return;
            const { cmds, als, cfg, pre, post } = ctx;
            const txt = m.message.conversation || m.message.extendedTextMessage?.text || '';
            if (!txt.startsWith(cfg.prefix)) return;
            const a = txt.slice(cfg.prefix.length).trim().split(/\s+/);
            const cmd = a.shift().toLowerCase();
            const key = cmds.has(cmd) ? cmd : als.get(cmd);
            if (!key || !cmds.has(key)) return;
            for (const fn of pre) {
                const go = await fn(m, ctx);
                if (!go) return;
            }
            const c = cmds.get(key);
            let res;
            try {
                res = await c.execute(sock, m, a, { ...ctx, command: c });
            } catch (e) {
                console.error(chalk.red(`[Cmd Error] ${cmd}:`), e);
                await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
                res = 'error';
            }
            for (const fn of post) {
                await fn(m, ctx, res);
            }
        } catch (e) {
            console.error(chalk.red('[messages.upsert]'), e);
        }
    }
}; 