import { query, body } from 'express-validator';

export const getValidator = [
  query('page').optional().isInt().withMessage('Page is not a valid number'),
  query('limit').optional().isInt().withMessage('Limit is not a valid number'),
];

export const postValidator = [
  body('name').notEmpty().isString().withMessage('`name` is not a valid string or its empty'),
  body('cuit').notEmpty().isString().withMessage('`cuit` is not a valid string or its empty'),
  body('concepts').notEmpty().isArray().withMessage('`concepts`  is not a valid array or its empty'),
  body('currentBalance').isInt().withMessage('`currentBalance` is not a valid number'),
  body('active').isBoolean().withMessage('`active` is not a valid boolean'),
  body('lastSale').isISO8601().toDate().withMessage('Invalid date received for `lastSale` (ISO8601)'),
];
