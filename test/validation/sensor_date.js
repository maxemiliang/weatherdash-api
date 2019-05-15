const {Joi} = require('celebrate');

module.exports = {
  params: {
    date: Joi.date().required(),
  },
  query: {
    interval: require('./sensor_interval.js'),
    token: require('./token.js'),
  },
};
