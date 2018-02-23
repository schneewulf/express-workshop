// @flow
import express from 'express';
import mongoose from 'mongoose';

import mainRoute from './routes/mainRoute';
import {PORT, CONNECTION_STRING} from './globals/config';

import bodyParser from 'body-parser';

let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(CONNECTION_STRING);

mongoose.Promise = global.Promise;

// parse application/json
app.use(bodyParser.json());

app.use('/api', mainRoute);

// app.use('/api/users', (req: Req, res: Res) => {
//   res.status(200).json({
//     status: 'OK',
//     users: [{id: 1, name: 'dommy', age: 25}],
//   });
// });

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
