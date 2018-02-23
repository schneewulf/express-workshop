// @flow
import type {$Request as Req, $Response as Res} from 'express';
import {
  generatedHashedPassword,
  isPasswordSame,
  generateFreshToken,
} from '../globals/helpers';
import User from '../models/UserModel';

type ReqBody = {
  name: string,
  email: string,
  password: string,
  confirmationPassword: string,
};

type ExtReq = {body: ReqBody} & Req;

async function signupController(req: ExtReq, res: Res) {
  let {name, email, password, confirmationPassword} = req.body;
  if (
    name === undefined ||
    email === undefined ||
    password === undefined ||
    confirmationPassword === undefined
  ) {
    res.status(400).json({
      status: 'ERROR',
      message:
        'Either email or password or name or confirmation password is not sent to the server',
    });
  } else if (password !== confirmationPassword) {
    res.status(400).json({
      status: 'ERROR',
      message: 'password and confirmation password do not matched',
    });
  } else {
    try {
      // We can use anything!
      let hashedPassword = generatedHashedPassword(password);
      let user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(200).json({
        token: generateFreshToken({id: user._id}),
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: 'NaNNaNNaNNaN Batman!',
      });
    }
  }
}

async function loginController(req: ExtReq, res: Res) {
  let {email, password} = req.body;
  if (email === undefined || password === undefined) {
    res.status(400).json({
      status: 'ERROR',
      message: 'Either password or email is not sent to the server',
    });
  } else {
    try {
      let user = await User.findOne({email});
      let isValidate = isPasswordSame(password, user.password);
      if (!isValidate) {
        res.status(401).json({
          status: 'ERROR',
          message: 'Email or Password does not match',
        });
      } else {
        let token = generateFreshToken({id: user._id});
        res.status(200).json({
          status: 'OK',
          token,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: 'server error',
      });
    }
  }
}

export {signupController, loginController};
