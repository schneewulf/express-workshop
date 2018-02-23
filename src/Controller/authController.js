//@flow

import type {$Request as Req, $Response as Res} from 'express';
import bcrypt from 'bcrypt';
import User from '../models/UserModel';
import jwt from 'jsonwebtoken';

type Reqbody = {
  name: string,
  email: string,
  password: string,
  confirmationPassword: string,
};

type ExtReq = {body: Reqbody} & Req;

async function signupController(req: ExtReq, res: Res) {
  let {name, email, password, confirmationPassword} = req.body;
  if (
    name === undefined ||
    email === undefined ||
    password === undefined ||
    confirmationPassword === undefined
  ) {
    res.status(400).json({
      status: 'error',
      message: 'name/email/password is undefined',
    });
  } else if (password !== confirmationPassword) {
    res.status(400).json({
      status: 'error',
      message: ' error',
    });
  } else {
    try {
      let salt = bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(password, salt);

      let users = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(200).json({
        token: jwt.sign({id: users._id}, 'something', {expiresIn: 100000}),
      });
      // let token = jwt.sign({data: email}, 'something', {expiresIn: 100000});
      // jwt.verify(token, 'something', (err, decoded) => {
      //   console.log('decoded', decoded);
      // });
      // res.status(200).json({
      //   status: 'ok',
      //   message: req.body,
      //   password: hashedPassword,
      //   token,
      // });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: ' error',
      });
    }
  }
}

async function loginController(req: ExtReq, res: Res) {
  let {email, password} = req.body;

  try {
    let user = await User.findOne({email});
    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    // let isPasswordCorrect = bcrypt.compare(password, user.password, (err) => {
    //   if (err) {
    //     res.status(500).json({
    //       status: 'error',
    //       message: ' password is not correct',
    //     });
    //   } else {
    //   }
    // });
    if (isPasswordCorrect) {
      res.status(200).json({
        name: user.name,
        token: jwt.sign({id: user._id}, 'something', {expiresIn: 100000}),
      });
    } else {
      throw new Error({message: 'Wrong pass'});
    }
  } catch (e) {
    res.status(500).json({
      message: ' error',
    });
  }
}

export {signupController, loginController};
