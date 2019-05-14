const {RateLimiterRedis} = require('rate-limiter-flexible');

module.exports = (app, redis) => {
  const rateLimiterOpts = require('../../config/RateLimiter');
  rateLimiterOpts.redis = redis;

  // @ts-ignore
  const rateLimiter = new RateLimiterRedis(rateLimiterOpts);

  return (req, res, next) => {
    rateLimiter
        .consume(req.ip)
        .then(() => {
          next();
        })
        .catch(() => {
          const resp = {
            statusCode: 429,
            error: 'Too Many Requests',
            message:
            'You are sending too many requests per second, Please slow down!',
          };
          res.status(429).json(resp);
        });
  };
};
