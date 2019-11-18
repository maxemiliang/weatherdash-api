const {Joi} = require('celebrate');

module.exports = {
  params: {
    sensor_name: Joi.string().min(1).max(255).required(),
  },
};
