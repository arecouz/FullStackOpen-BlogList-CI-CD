import dotenv from 'dotenv';
import logger from './logger.js';

logger.info('testing logger');
dotenv.config();

const { PORT, TEST_MONGODB_URI, MONGODB_URI, NODE_ENV, SECRET } = process.env;

logger.info('config', MONGODB_URI);

const MONGODB_URI_TO_USE =
  NODE_ENV === 'test'
    ? (logger.info('Using test database...'), TEST_MONGODB_URI)
    : (logger.info('Using production database...'), MONGODB_URI);

export { MONGODB_URI_TO_USE as MONGODB_URI, PORT, SECRET };
