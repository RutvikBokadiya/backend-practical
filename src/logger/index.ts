import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const level = () => {
  // const isDevelopment = env === ENVIRONMENT.DEVELOPMENT;
  const isDevelopment = true;
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // winston.format.colorize({ all: true })
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
  // winston.format.prettyPrint()
  // winston.format.json()
);

const mydate = new Date();
const newFilename =
  mydate.getFullYear() + '-' + mydate.getMonth() + '-' + mydate.getDate();

const transports = [
  new winston.transports.Console({
    format: winston.format.colorize({ all: true })
  }),
  new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
  new winston.transports.File({
    handleExceptions: true,
    filename: `./logs/${newFilename}.log`
  })
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
});

export default Logger;
