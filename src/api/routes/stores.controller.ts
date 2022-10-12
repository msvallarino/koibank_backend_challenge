import { Router, Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { badData } from '@hapi/boom';
import StoreService from '../../services/store.service';
import Logger from '../../utils/logger';
import { getValidator, postValidator } from '../../validators/store.validator';
import { QueryOptions } from '../../db/dal/store.dal';
import { formatGetAllStore } from '../../decoratos/stores.decorator';

const route = Router();

export default (app: Router) => {
  app.use('/stores', route);

  route.get('/all', getValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw badData('Invalid query params', { errors: errors.array() });
      }

      /**
       * Already validated  number format
       */
      const { limit, page } = req.query;

      const queryOptions: QueryOptions = {};

      if (limit) queryOptions.limit = parseInt(limit as string, 10);
      if (page) queryOptions.page = parseInt(page as string, 10);

      const store = await StoreService.getAllStores(queryOptions);
      return res
        .json({
          status: 200,
          data: {
            ...formatGetAllStore(store),
          },
        })
        .status(200);
    } catch (err) {
      Logger.error(`GET stores: ${err}`);
      next(err);
    }
  });

  route.post('/', postValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw badData('Invalid data', { errors: errors.array() });
      }

      const newStore = await StoreService.createStore(req.body);
      return res
        .json({
          status: 201,
          data: {
            message: 'Store successfully created',
            store: newStore,
          },
        })
        .status(201);
    } catch (err) {
      Logger.error(`POST stores: ${err}`);
      next(err);
    }
  });
};
