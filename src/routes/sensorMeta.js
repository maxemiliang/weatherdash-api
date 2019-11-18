const {celebrate, errors} = require('celebrate');
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
      '/:sensor_name',
      celebrate(require('../../test/validation/sensor_name')),
      AuthMiddleware(),
      wrap(async (req, res, next) => {
        try {
          const data = await models['SensorMeta'].findOne({where: {sensor_name: req.params.sensor_name}});
          res.status(200);
          const resp = {
            statusCode: 200,
            message: 'Retrived SensorMeta',
            data: data,
          }
          res.json(resp);
        } catch(err) {
          throw err;
        }
      }),
  )

  router.post(
      '/',
      celebrate(require('../../test/validation/sensor_meta_add')),
      AuthMiddleware(),
      wrap(async (req, res, next) => {
        try {
          let data = await models['SensorMeta'].upsert({
            ...req.body,
          }, { returning: true });

          if (data.length > 1) data = data[0];

          const resp = {
            statusCode: 201,
            message: 'SensorMeta created',
            data: data,
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