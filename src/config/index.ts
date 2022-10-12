import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.APP_PORT, 10),
  api: {
    prefix: process.env.APP_ROUTE_PREFIX,
  },
  logs: {
    level: process.env.LOG_LEVEL,
  },
  db: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
    ADDRESS: process.env.DB_HOST + ':' + process.env.DB_PORT,
  },
};
