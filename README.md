 # EMS WhatsApp Bot

A modular WhatsApp bot built with [Baileys](https://github.com/WhiskeySockets/Baileys), designed for easy command/event extension and expressive message handling.

## Features

- **Prefix commands** (e.g. `!ping`, `!menu`)
- **Dynamic command loading** from `commands/`
- **Event system** with auto-loading from `events/`
- **Middleware** for pre/post message processing
- **Session persistence** with Baileys v6 multi-file auth
- **Colored logs** with chalk
- **Easy config** in `config.js`

## Quick Start

1. **Clone & Install**
    ```sh
    git clone [<(https://github.com/eulfn/WhatsappBot-EMS)>]
    cd Bot-EMS
    npm install
    ```
2. **Configure**
    - Edit `config.js` with your WhatsApp number, prefix, bot name, etc.
3. **Run**
    ```sh
    npm start
    ```
    - Scan the QR code with WhatsApp.

## Usage

- **Commands:**
    - `!ping` — Replies with "Pong!" and latency
    - `!menu` — Lists all commands
    - `!owner` — Shows owner contact info
- **Add your own:** Drop a `.js` file in `commands/` with:
    ```js
    module.exports = {
      name: 'hi',
      aliases: ['hello'],
      description: 'Say hi',
      usage: '!hi',
      async execute(sock, m, a, ctx) {
        await sock.sendMessage(m.key.remoteJid, { text: 'Hey!' });
      },
    };
    ```

## Structure

```
Bot-EMS/
├── commands/         # Command modules
├── events/           # Event handlers
├── middleware.js     # Pre/post middlewares
├── config.js         # Bot config
├── index.js          # Main entry
├── package.json      # Dependencies
```

## Extending
- **Events:** Add a file to `events/`:
    ```js
    module.exports = {
      event: 'messages.upsert',
      handler: async (sock, data, ctx) => { /* ... */ }
    };
    ```
- **Middleware:** Edit `middleware.js` to add pre/post hooks.

## Credits
- [Baileys](https://github.com/WhiskeySockets/Baileys)
- [Chalk](https://github.com/chalk/chalk)
- [Figlet](https://github.com/patorjk/figlet.js)

---
MIT License
