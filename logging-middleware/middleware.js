import { log } from './loggingmiddleware.js';

export const loggingMiddleware = (req, res, next) => {
  log('info', 'request', `Incoming request: ${req.method} ${req.url}`);
  next();
};
