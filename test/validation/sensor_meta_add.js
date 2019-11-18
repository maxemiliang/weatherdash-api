const {Joi} = require('celebrate');
const token = require('./token');

module.exports = {
  body: {
    token: token,
    sensor_name: Joi.string()
        .min(1)
        .max(255)
        .required(),
    meta: Joi.object().required(),
  },
};
