// @flow

import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minlength: 6,
  },
});

export default mongoose.model('User', UserSchema);
