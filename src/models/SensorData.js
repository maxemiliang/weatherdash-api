const Sequelize = require('sequelize');
const Model = Sequelize.Model;

/**
 * @class SensorData
 * @extends {Model}
 */
class SensorData extends Model {}

module.exports.init = (sequelize) => {
  SensorData.init(
      {
        temperature: {
          type: Sequelize.FLOAT,
        },
        humidity: {
          type: Sequelize.FLOAT,
        },
        source_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'SensorData',
      }
  );

  return SensorData;
};
