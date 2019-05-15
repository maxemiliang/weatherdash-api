const sequelize = require('sequelize');

module.exports.averageHour = [
  [
    // @ts-ignore
    sequelize.fn('date_trunc', 'hour', sequelize.col('updatedAt')),
    'timestamp',
  ],
  [
    // @ts-ignore
    sequelize.fn('AVG', sequelize.col('temperature')),
    'avg_temp',
  ],
  [
    // @ts-ignore
    sequelize.fn('AVG', sequelize.col('humidity')),
    'avg_humidity',
  ],
  'source_name',
];

module.exports.groupByTime = ['timestamp', 'source_name'];
