import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database Connection Successful');

    server = app.listen(config.port, () => {
      logger.info(`Application Listening at port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`error connecting to database\n\t${error}`);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      errorLogger.error(error);
      server.close();
      process.exit(1);
    } else {
      process.exit(1);
    }
  });
}

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM Received')
//   if (server) {
//     server.close()
//   }
// })

bootstrap();
