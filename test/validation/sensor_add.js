const {Joi} = require('celebrate');
const token = require('./token');

module.exports = {
  body: {
    token: token,
    source_name: Joi.string()
        .min(1)
        .max(255)
        .required(),
    temperature: Joi.number().required(),
    humidity: Joi.number().required(),
  },
};
