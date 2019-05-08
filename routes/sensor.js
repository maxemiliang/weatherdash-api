const {celebrate, errors} = require('celebrate');
const dayjs = require('dayjs');
const redis = require('../models/redis');
const cache = require('express-redis-cache')({
  client: redis,
  expire: 120,
});
const Op = require('sequelize').Op;
const wrap = require('./wrap');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

module.exports = (express, models = {}) => {
  const router = express.Router();

  router.get(
      '/',
      cache.route(),
      AuthMiddleware(),
      wrap(async (req, res, next) => {
        let data;
        try {
          data = await models['SensorData'].findAll({
            where: {
              createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
              },
            },
          });
        } catch (err) {
          const error = {
            statusCode: 500,
            message: 'Error retriving data',
          };
          res.json(error);
          return next(error);
        }
        const resp = {
          statusCode: 200,
          message: 'Latest Sensordata retrived',
          data: data,
        };
        res.json(resp);
      })
  );

  router.get(
      '/all',
      cache.route(),
      AuthMiddleware(),
      wrap(async (req, res, next) => {
        let data;
        try {
          data = await models['SensorData'].findAll();
        } catch (err) {
          const error = {
            statusCode: 500,
            message: 'Error retriving data',
          };
          res.json(error);
          return next(error);
        }
        const resp = {
          statusCode: 200,
          message: 'All Sensordata retrived',
          data: data,
        };
        res.json(resp);
      })
  );

  router.post(
      '/',
      celebrate(require('../test/validation/sensor_add')),
      AuthMiddleware(),
      wrap(async (req, res, next) => {
        try {
          const data = await models['SensorData'].create({
            ...req.body,
          });
          const resp = {
            statusCode: 201,
            message: 'SensorData created',
            data: JSON.stringify(data),
          };
          res.status(201);
          res.json(resp);
        } catch (err) {
          const error = {
            statusCode: 500,
            message: 'Error adding data',
          };
          res.json(error);
          return next(error);
        }
      })
  );

  router.get(
      '/date/:date',
      cache.route(),
      AuthMiddleware(),
      celebrate(require('../test/validation/sensor_date')),
      wrap(async (req, res, next) => {
        try {
          const date = dayjs(req.params.date);

          const data = await models['SensorData'].findAll({
            where: {
              createdAt: {
                [Op.gte]: date.toISOString(),
                [Op.lte]: date.add(1, 'day').toISOString(),
              },
            },
          });
          const resp = {
            statusCode: 200,
            message: `All sensor data from: ${date.toDate()}`,
            data: data,
          };

          res.json(resp);
        } catch (err) {
          const error = {
            statusCode: 500,
            message: 'Error retriving data',
          };
          res.json(error);
          return next(error);
        }
      })
  );

  router.use(errors());

  return router;
};
