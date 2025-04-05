# README

Express middleware for simple session context.

# What it does

It adds a `context` variable to the `app` object.

# Usage

Default usage is to just `require` the module and then use it as a middleware.

```js
const context = require('@soderlundf/context');
const express = require('express');

const app = express();

app.use(context);

app.get('/', (req, res) => {
    console.log(app.context);
    res.status(200).send();
});

app.listen(3000, () => { });
```

Output

```
{
  sessionId: '1192dccb-e039-4cd4-9f73-4bcbed0c006f',
  timestamp: '2025-04-05T14:43:56.103Z'
}
```

Additional data can be added using environment variables prefixed with `ctx_` (case insensitive) before starting your app.

Output with three `ctx_` environment variables defined.

```
{
  sessionId: '0f2ad419-b1ac-4a5e-830e-638faf96b111',
  timestamp: '2025-04-05T14:56:04.264Z',
  ctx_author: 'Freddy Söderlund',
  ctx_version: '1.0.0',
  ctx_build: 'cf8jhk'
}
```

`sessionId` and `timestamp` will be updated at each call.