import { body } from 'express-validator/check';
import models from '../../models';

const validators = {};
validators.createUser = [
  body('name').exists().isString(),
  body('username').exists().isString().isAlphanumeric()
    .custom(async (value, { req }) => {
      const exists = await models.user.count(
        {
          where:
          { username: value },
        },
      );
      if (exists) throw new Error('Username already taken');
    }),
  body('password').exists().isString(),
];

validators.editUser = [
  body('name')
    .exists()
    .isString()
    .optional(),
  body('username')
    .exists()
    .isString()
    .isAlphanumeric()
    .optional()
    .custom(async (value, { req }) => {
      const exists = await models.user.count(
        {
          where:
          { username: value },
        },
      );
      if (exists) throw new Error('Username already taken');
    }),
  body('password')
    .exists()
    .isString()
    .optional(),
];

export default validators;
