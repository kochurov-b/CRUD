import mongoose from 'mongoose';

import { config } from '../config/config';

export const connectDb = () => {
  const { mongoUri } = config;

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};
