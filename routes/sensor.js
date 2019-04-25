const {celebrate, errors} = require('celebrate');
const redis = require('../models/redis');
const cache = require('express-redis-cache')({
  client: redis,
  expire: 60,
});
// const AuthMiddleware = require('../middlewares/AuthMiddleware');

module.exports = (express, models = {}) => {
  const router = express.Router();

  router.get('/', cache.route(), async (req, res) => {
    let data;
    try {
      data = await models['SensorData'].findAll();
    } catch (err) {
      throw err;
    }
    res.json(data);
  });

  router.post(
      '/',
      celebrate(require('../test/validation/sensor_data')),
      async (req, res) => {
        try {
          const data = await models['SensorData'].create({
            ...req.body,
          });
          const resp = {
            statusCode: 200,
            message: 'SensorData created',
            data: JSON.stringify(data),
          };
          res.json(resp);
        } catch (err) {
          throw err;
        }
      }
  );

  router.use(errors());

  return router;
};
