//@flow

import {Router} from 'express';
import {signupController, loginController} from '../Controller/authController';
let mainRoute = Router();

//post
mainRoute.post('/auth/signup', signupController);
mainRoute.post('/auth/login', loginController);
//
// //get
// mainRoute.get('/users');

export default mainRoute;
