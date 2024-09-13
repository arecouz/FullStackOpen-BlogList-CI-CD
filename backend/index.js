import app from './app.js';
import * as config from './utils/config.js';
import logger from './utils/logger.js';

const PORT = config.PORT || 3000

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
