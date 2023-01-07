'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class model_questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  model_questions.init({
    question_name: DataTypes.STRING,
    question_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'model_questions',
  });
  return model_questions;
};