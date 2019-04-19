const {
  Joi
} = require('celebrate');

module.exports = {
  body: {
    sensor_name: Joi.string().min(1).max(255).required(),
    temperature: Joi.number().required(),
    humidity: Joi.number().required(),
  }
}