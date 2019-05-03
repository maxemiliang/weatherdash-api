const {Joi} = require('celebrate');

module.exports = {
  params: {
    date: Joi.date().required(),
  },
};
