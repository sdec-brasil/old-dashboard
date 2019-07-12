import { body } from 'express-validator/check';

const validators = {};
validators.createClient = [
  body('name').exists().isString(),
  body('secret').exists().isString(),
];

validators.editClient = [
  body('name').exists().isString().optional(),
  body('secret').exists().isString().optional(),
];

export default validators;
