const Sequelize = require('sequelize');

const connString = process.env.DATABASE_URL || 'postgres://postgres:development@postgres:5432/weatherdash';

// @ts-ignore
const sequelize = new Sequelize(connString, {
  logging: false,
});

module.exports = sequelize;