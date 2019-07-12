import models from '../../models';
import { errors, requests } from '../../utils';


const getUserInfo = async req => models.user.findOne({
  where: {
    id: req.user.id,
  },
  include: [{
    model: models.empresa,
  }],
  attributes: ['id', 'name', 'username', 'createdAt', 'updatedAt', 'empresaCnpj'],
})
  .then((userInstance) => {
    if (userInstance !== null) {
      delete userInstance.password;
      return { code: 200, data: userInstance };
    }
    throw new errors.NotFoundError('User', `id ${req.user.id}`);
  }).catch((err) => {
    throw err;
  });


const updateUser = async (req) => {
  const excludedKeys = ['id', 'createdAt', 'updatedAt'];
  return requests.patch(models.user, req.user.id, req, excludedKeys)
    .then((updatedUser) => {
    // remove password before returning the updated user
      delete updatedUser.password;
      return { code: 200, data: updatedUser };
    })
    .catch((err) => {
      throw err;
    });
};


const createNewUser = async (req) => {
  const newUserInfo = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
  return models.user.create(newUserInfo)
    .then((newUser) => {
      newUser.password = undefined;
      return { code: 200, data: newUser };
    })
    .catch((err) => {
      throw err;
    });
};


export default {
  getUserInfo,
  updateUser,
  createNewUser,
};
