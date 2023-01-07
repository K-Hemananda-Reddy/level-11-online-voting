'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class model_voter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  model_voter.init({
    voter_id: DataTypes.STRING,
    password: DataTypes.STRING,
    voted: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'model_voter',
  });
  return model_voter;
};