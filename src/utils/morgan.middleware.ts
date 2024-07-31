import morgan, { StreamOptions } from 'morgan';
import Logger from '../logger';
import { ENVIRONMENT } from '../constant';

const NODE_ENV = process.env.NODE_ENV;

const stream: StreamOptions = {
  write: (message) => Logger.http(message)
};

const skip = () => {
  
  const env = NODE_ENV || ENVIRONMENT.DEVELOPMENT;
  return env !== ENVIRONMENT.DEVELOPMENT;
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

export default morganMiddleware;
