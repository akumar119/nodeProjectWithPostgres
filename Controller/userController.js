import bcrypt from 'bcrypt';
// import { use } from 'bcrypt/promises';
import { User } from '../models';
import checkDuplicateEmail from './userServices';

export const userSignup = async (req, res) => {
  console.log('userSignup is working fine..........', req.body);
  try {
    // console.log(db.sequelize.User)
    const duplicateUser = await checkDuplicateEmail(req.body.email);
    if (duplicateUser) {
      throw new Error('This email is already register.');
    }
    if (req.body && req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }
    const saveData = {
      name: req.body && req.body.name ? req.body.name : '',
      email: req.body.email,
      password: req.body.password,
    };
    const user = await User.create(saveData);
    console.log('user>>>>', user);
    res.status(201).send({ message: 'signup success', data: user });
  } catch (err) {
    console.log('error in userSignup func>>>>>', err);
    res.status(400).send(err);
  }
};
export const userLogin = async (req, res) => {
  try {
    const criteria = {
      email: req.body.email,
      status: 'ACTIVE',
    };
    const user = await User.findOne({ where: criteria });
    if (!user) {
      throw new Error('This email does not register with us.');
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      throw new Error('Incorrect Password!');
    }
    delete user.password;
    res.status(200).send({ message: 'login successfully!', data: user });
  } catch (err) {
    console.log('error in userLogin func>>>>>', err);
    res.status(400).send(err);
  }
};
