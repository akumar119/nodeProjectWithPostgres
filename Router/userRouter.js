import express from 'express';
import { userSignup, userLogin } from '../Controller/userController';

const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
const userValidator = require('./userValidator');

router.post('/user/signup', validator.body(userValidator.signupUser), userSignup);

router.post('/user/login', validator.body(userValidator.loginUser), userLogin);

export default router;
