// @flow

import {Router} from 'express';
import {signupController} from '../controllers/authController';

let mainRoute = Router();

// auth
mainRoute.post('/auth/signup', signupController);
// mainRoute.post('/auth/login', /*login controller*/)
//
// // users
// mainRoute.get('/users', /* users contoller*/);

export default mainRoute;
