const {
  celebrate,
  errors
} = require('celebrate');

module.exports = (express, models = {}) => {

  const router = express.Router();

  router.get('/', async (req, res) => {
    let data;
    try {
      data = await models['SensorData'].findAll();
    } catch (err) {
      throw err;
    }
    res.send(JSON.stringify(data));
  });

  router.post('/', celebrate(
    require('../test/validation/sensor_data')
  ), async (req, res) => {
    try {
      if (req.body.token != "SecretTokenHello") {
        res.status(403);
        res.json({
          statusCode: 403,
          message: 'Token is invalid.',
        });
        return;
      }
      const data = await models['SensorData'].create({
        ...req.body
      });
      const resp = {
        statusCode: 200,
        message: 'SensorData created',
        data: JSON.stringify(data),
      }
      res.json(resp);
    } catch (err) {
      throw err;
    }
  });

  router.use(errors());

  return router;
};