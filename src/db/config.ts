import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
import config from '../config';
import Logger from '../utils/logger';

const connectDB = async () => {
  try {
    // const options: ConnectOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
    const mongoUrl = `mongodb://${config.db.ADDRESS}/${config.db.DB_NAME}`;
    const client = await mongoose.connect(mongoUrl);
    return client.connection.db;
  } catch (error) {
    Logger.error('Could not connect to db', error);
    process.exit(1);
  }
};

export default connectDB;
