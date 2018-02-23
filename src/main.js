//@flow

import express from 'express';
import mongoose from 'mongoose';

import {PORT, CONNECTION_STRING} from './globals/config';
import mainRoute from './Routes/mainRoute';
import bodyParser from 'body-parser';

let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(CONNECTION_STRING);

mongoose.Promise = global.Promise;
// parse application/json
app.use(bodyParser.json());

app.use('/api', mainRoute);

app.listen(PORT, () => {
  console.log('listening at port 8080');
});
