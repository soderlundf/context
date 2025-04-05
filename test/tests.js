const test = require('node:test');
const assert = require('node:assert/strict');
const process = require('node:process');

test.describe('Load', () => {
    test('loads the context module', async () => {
        const context = require('../src/index.js');
        assert.ok(context, 'context module loaded');
    });
});

test.describe('Context', () => {
    test('creates a context', async () => {
        const context = require('../src/index.js');
        const req = { app: {} };
        const res = {};
        const next = () => { };
        context(req, res, next);
        assert.ok(req.app.context, 'context created');
    });

    test('sets the sessionId', async () => {
        const context = require('../src/index.js');
        const req = { app: {} };
        const res = {};
        const next = () => { };
        context(req, res, next);
        assert.ok(req.app.context.sessionId, 'sessionId set');
    });

    test('sets the timestamp', async () => {
        const context = require('../src/index.js');
        const req = { app: {} };
        const res = {};
        const next = () => { };
        context(req, res, next);
        assert.ok(req.app.context.timestamp, 'timestamp set');
    });
    test('sets the environment variables', async () => {
        process.env.CTX_TEST = 'test';
        const context = require('../src/index.js');
        const req = { app: {} };
        const res = {};
        const next = () => { };
        context(req, res, next);
        assert.equal(req.app.context.CTX_TEST, 'test', 'environment variable set');
    });
    test('does not set non-CTX environment variables', async () => {
        process.env.TEST = 'test';
        const context = require('../src/index.js');
        const req = { app: {} };
        const res = {};
        const next = () => { };
        context(req, res, next);
        assert.equal(req.app.context.TEST, undefined, 'non-CTX environment variable not set');
    });
});

