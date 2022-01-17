/* eslint-disable consistent-return */
import res from 'express/lib/response';
import { User } from '../models';

const checkDuplicateEmail = async (email) => {
  try {
    let response = false;
    const criteria = {
      email,
      status: 'ACTIVE',
    };
    const user = await User.findOne({ where: criteria });
    if (user) {
      response = true;
    }
    return response;
  } catch (err) {
    console.log('error in checkDuplicatEmail>>>>>', err);
    res.status(400).send(err);
  }
};
export default checkDuplicateEmail;
