const test = require('node:test');
const assert = require('node:assert/strict');

test.describe('Load', () => {
    test('loads the context module', async (t) => {
        const context = require('../src/index.js');
        assert.ok(context, 'context module loaded');
    });
});

test.describe('Context', () => {
    test('creates a context', async (t) => {
        const context = require('../src/index.js');
        const req = { app: {} };
        const res = {};
        const next = () => { };
        context(req, res, next);
        assert.ok(req.app.context, 'context created');
    });

    test('sets the sessionId', async (t) => {
        const context = require('../src/index.js');
        const req = { app: {} };
        const res = {};
        const next = () => { };
        context(req, res, next);
        assert.ok(req.app.context.sessionId, 'sessionId set');
    });

    test('sets the timestamp', async (t) => {
        const context = require('../src/index.js');
        const req = { app: {} };
        const res = {};
        const next = () => { };
        context(req, res, next);
        assert.ok(req.app.context.timestamp, 'timestamp set');
    });
    test('sets the environment variables', async (t) => {
        process.env.CTX_TEST = 'test';
        const context = require('../src/index.js');
        const req = { app: {} };
        const res = {};
        const next = () => { };
        context(req, res, next);
        assert.equal(req.app.context.CTX_TEST, 'test', 'environment variable set');
    });
    test('does not set non-CTX environment variables', async (t) => {
        process.env.TEST = 'test';
        const context = require('../src/index.js');
        const req = { app: {} };
        const res = {};
        const next = () => { };
        context(req, res, next);
        assert.equal(req.app.context.TEST, undefined, 'non-CTX environment variable not set');
    });
});

