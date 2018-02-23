// @flow
import type {$Request as Req, $Response as Res} from 'express';
import bcrypt from 'bcrypt';

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
      let salt = bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(password, salt);
      res.status(200).json({
        status: 'OK',
        message: req.body,
        password: hashedPassword,
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: 'NaNNaNNaNNaN Batman!',
      });
    }
  }
}

export {signupController};
