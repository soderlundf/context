const { AsyncLocalStorage } = require('async_hooks');
const { randomUUID } = require('crypto');

const context = new AsyncLocalStorage();

function mw(req, res, next) {
    context.run(randomUUID, () => {
        req.session = context.getStore();
        next();
    });
}

module.exports = { mw };
