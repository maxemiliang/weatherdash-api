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
const {averageHour, groupByTime} = require('../models/attributes.js');

module.exports = (express, models = {}) => {
  const router = express.Router();

  router.get(
      '/',
      cache.route(),
      celebrate({
        query: {
          token: require('../../test/validation/token'),
          interval: require('../../test/validation/sensor_interval'),
        },
      }),
      AuthMiddleware(),
      wrap(async (req, res, next) => {
        let data;
        const query = {
          where: {
            createdAt: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
          },
        };

        if (req.query.interval) {
          query.attributes = averageHour;
          query.group = groupByTime;
        }
        try {
          data = await models['SensorData'].findAll(query);
        } catch (err) {
          throw err;
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
      celebrate({
        query: {
          token: require('../../test/validation/token'),
          interval: require('../../test/validation/sensor_interval'),
        },
      }),
      AuthMiddleware(),
      wrap(async (req, res, next) => {
        let data;
        const query = {};
        if (req.query.interval) {
        // @ts-ignore
          query.attributes = averageHour;
          query.group = groupByTime;
        }

        try {
          data = await models['SensorData'].findAll(query);
        } catch (err) {
          throw err;
        }
        const resp = {
          statusCode: 200,
          message: 'All Sensordata retrived',
          data: data,
        };
        res.json(resp);
      })
  );

  router.get(
      '/date/:date',
      cache.route(),
      AuthMiddleware(),
      celebrate(require('../../test/validation/sensor_date')),
      wrap(async (req, res, next) => {
        try {
          const date = dayjs(req.params.date);
          const query = {
            where: {
              createdAt: {
                [Op.gte]: date.toISOString(),
                [Op.lte]: date.add(1, 'day').toISOString(),
              },
            },
            attributes: [
              'id',
              'temperature',
              'humidity',
              'source_name',
              ['updatedAt', 'timestamp'],
            ],
          };

          if (req.query.interval) {
          // @ts-ignore
            query.attributes = averageHour;
            query.group = groupByTime;
          }

          const data = await models['SensorData'].findAll(query);
          const resp = {
            statusCode: 200,
            message: `All sensor data from: ${date.toDate()}`,
            data: data,
          };

          res.json(resp);
        } catch (err) {
          console.error(err);
        }
      })
  );

  router.post(
      '/',
      celebrate(require('../../test/validation/sensor_add')),
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
          throw err;
        }
      })
  );

  router.use(errors());

  return router;
};
