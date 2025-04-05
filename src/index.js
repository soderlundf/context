const { AsyncLocalStorage } = require('async_hooks');
const { randomUUID } = require('crypto');
const process = require('node:process');

const ctx = new AsyncLocalStorage();

function context(req, res, next) {
    ctx.run(randomUUID(), () => {
        let _ctx = {
            sessionId: ctx.getStore(),
            timestamp: new Date().toISOString()
        };
        Object.keys(process.env).map((key) => {
            if (key.toLowerCase().startsWith('ctx_')) {
                _ctx[key] = process.env[key];
            }
        });
        req.app.context = _ctx;
        next();
    });
}

module.exports = context;
