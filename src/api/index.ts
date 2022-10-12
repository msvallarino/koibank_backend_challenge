import { Router } from 'express';
import stores from './routes/stores';

export default () => {
  const app = Router();
  stores(app);

  return app;
};
