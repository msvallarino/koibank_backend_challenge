import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import config from '../config';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../documentation/swagger.json';
import routes from '../api';
import { authMiddleware } from '../api/middlewares/auth';
import { errorHandler } from '../api/middlewares/errorHandler';

export default async (app: Express) => {
  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  app.get('/health', (req, res) => res.status(200).send('API is running!'));

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Auth Middleware
  app.use(authMiddleware);

  // Load API routes
  app.use(config.api.prefix, routes());

  // Load Error handler middleware
  app.use(errorHandler);

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    next(err);
  });
};
