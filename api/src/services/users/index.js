import models from '../../models';
import { customErr, requests } from '../../utils';


const getUserInfo = async req => new Promise(async (resolve) => {
  if (req.user) {
    const userInstance = await models.user.findOne({
      where: {
        id: req.user.id,
      },
      include: [{
        model: models.empresa,
      }],
      attributes: ['id', 'name', 'username', 'createdAt', 'updatedAt', 'empresaCnpj'],
    });
    if (userInstance !== null) {
      delete userInstance.password;
      resolve({ code: 200, data: userInstance });
    }
  }
  resolve({ code: 500, data: { error: customErr.formatErr({ type: 'userNotFound', message: 'User not found. Make sure you are logged in.' }) } });
});


const updateUser = async req => new Promise(async (resolve) => {
  const excludedKeys = ['id', 'createdAt', 'updatedAt'];
  try {
    const updatedUser = await requests.patch(models.user, req.user.id, req, excludedKeys);
    // remove password before returning the updated user
    updatedUser.password = undefined;
    resolve({ code: 200, data: updatedUser });
  } catch (err) {
    console.log(err);
    const errors = {};
    err.errors.forEach((e) => {
      errors[e.path] = e.message;
    });
    resolve({ code: 500, data: { errors } });
  }
});


const createNewUser = async req => new Promise(async (resolve) => {
  const newUserInfo = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await models.user.create(newUserInfo);
    newUser.password = undefined;
    resolve({ code: 200, data: newUser });
  } catch (err) {
    console.log(err);
    const errors = {};
    err.errors.forEach((e) => {
      errors[e.path] = e.message;
    });
    resolve({ code: 500, data: { errors } });
  }
});


export default {
  getUserInfo,
  updateUser,
  createNewUser,
};
