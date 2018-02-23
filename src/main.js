// @flow
import express from 'express';
import type {$Request as Req, $Response as Res} from 'express';

import {PORT} from './globals/config';

let app = express();

app.use('/api/users', (req: Req, res: Res) => {
  res.status(200).json({
    status: 'OK',
    users: [{id: 1, name: 'dommy', age: 25}],
  });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
