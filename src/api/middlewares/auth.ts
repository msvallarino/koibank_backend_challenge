import { Request, Response, NextFunction } from 'express';
import { unauthorized } from '@hapi/boom';
import auth from 'basic-auth';
import UserService from '../../services/user.service';
import Logger from '../../utils/logger';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = await auth(req);
    if (!(credentials && credentials.name && credentials.pass)) {
      res.statusCode = 401;
      throw unauthorized();
    }

    try {
      await UserService.validateUserCredentials(credentials.name, credentials.pass);
    } catch (error) {
      throw unauthorized();
    }

    next();
  } catch (err) {
    Logger.error(`Auth Middleware: ${err}`);
    next(err);
  }
};
