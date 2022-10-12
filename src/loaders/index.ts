import { Express } from 'express';
import expressLoader from './express';
import { dbLoader } from '../db/loader';
import Logger from '../utils/logger';

export default async (app: Express) => {
  await dbLoader();
  Logger.info('Database loaded');
  await expressLoader(app);
  Logger.info('Express App loaded');
};
