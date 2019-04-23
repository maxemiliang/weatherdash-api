const {Joi} = require('celebrate');

module.exports = {
  body: {
    token: Joi.string()
        .min(16)
        .max(16)
        .required(),
    sensor_name: Joi.string()
        .min(1)
        .max(255)
        .required(),
    temperature: Joi.number().required(),
    humidity: Joi.number().required(),
  },
};
