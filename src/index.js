const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

const sessionContextMiddleware = (req, res, next) => {
    asyncLocalStorage.run(new Map(), () => {
        asyncLocalStorage.getStore().set('sessionId', req.headers['x-session-id'] || 'default-session');
        next();
    });
};

const getSessionContext = () => {
    const store = asyncLocalStorage.getStore();
    if (!store) {
        throw new Error('No session context available');
    }
    return store;
};

module.exports = { getSessionContext };
