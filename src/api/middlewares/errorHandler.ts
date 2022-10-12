import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { isBoom, Boom } from '@hapi/boom';

export const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = {
    status: statusCode,
    error: {
      message: 'An unknown error occurred while processing this request.',
    },
  };

  if (isBoom(err)) {
    const boomError = err as Boom;
    statusCode = boomError.output.statusCode;
    message = {
      status: boomError.output.statusCode,
      error: {
        message: boomError.output.payload.message,
        ...boomError.data,
      },
    };
  }

  console.log('llegue aca al eerror middleware che');
  console.log(err);
  res.status(statusCode);
  res.send(message);
};
