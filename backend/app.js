import { MONGODB_URI, PORT } from './utils/config.js';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import blogsRouter from './controllers/blogs.js';
import usersRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import testingRouter from './controllers/testing.js';

import * as middleware from './utils/middleware.js';
import logger from './utils/logger.js';
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
logger.info('connecting to mongoDB blogsList...');

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('connection successfull');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.authenticationToken);

app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  logger.info('port: ', PORT);
  app.use('/api/testing', testingRouter);
} else {
  logger.info('using dist');
  app.use(express.static('dist'));
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
