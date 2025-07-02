const chalk = require('chalk');

module.exports = {
    event: 'group-participants.update',
    handler: async (sock, up, ctx) => {
        try {
            const { id, participants, action } = up;
            console.log(chalk.yellow(`[Group Update] ${action} in ${id}: ${participants.join(', ')}`));
            if (action === 'add') {
                for (const u of participants) {
                    await sock.sendMessage(id, { text: `Welcome @${u.split('@')[0]}!`, mentions: [u] });
                }
            }
        } catch (e) {
            console.error(chalk.red('[group-participants.update]'), e);
        }
    }
}; 