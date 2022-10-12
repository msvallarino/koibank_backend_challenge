import { Router } from 'express';
import stores from './routes/stores.controller';

export default () => {
  const app = Router();
  stores(app);

  return app;
};
