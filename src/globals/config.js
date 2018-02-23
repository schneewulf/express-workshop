//@flow

require('dotenv').config();

let PORT = process.env.PORT || 6060;
let CONNECTION_STRING = process.env.CONNECTION_STRING;

export {PORT, CONNECTION_STRING};
