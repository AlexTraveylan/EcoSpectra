import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message}`;

  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }

  return msg;
});

export const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat,
    format.colorize({ all: true }),
  ),
  transports: [
    new transports.Console({
      format: combine(
        nestWinstonModuleUtilities.format.nestLike('EcoSpectra-back', {
          prettyPrint: true,
        }),
      ),
    }),
    new transports.File({
      filename: 'logs/combined.log',
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
});

export const logInfo = (message: string, metadata: object = {}) => {
  logger.info(message, metadata);
};

export const logError = (
  message: string,
  error?: Error,
  metadata: object = {},
) => {
  logger.error(message, { ...metadata, error: error?.stack });
};

export const logWarn = (message: string, metadata: object = {}) => {
  logger.warn(message, metadata);
};

export const logDebug = (message: string, metadata: object = {}) => {
  logger.debug(message, metadata);
};
