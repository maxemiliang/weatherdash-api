const Sequelize = require('sequelize');
const Model = Sequelize.Model;

/**
 * @class SensorMeta
 * @extends {Model}
 */
class SensorMeta extends Model {}

module.exports.init = (sequelize) => {
  SensorMeta.init(
      {
        meta: {
          type: Sequelize.JSON,
        },
        sensor_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'SensorMeta',
      }
  );

  return SensorMeta;
};
