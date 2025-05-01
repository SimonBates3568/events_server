// This file is responsible for logging messages in the application.
// It uses the Winston library to create a logger instance that can log messages
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'bookstore-api' },
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
} else {
  logger.add(
    new winston.transports.File({
      filename: 'logs/production.log',
      format: winston.format.json(),
    }),
  );
}

export default logger;