'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class model_voter extends Model {
    resetPassword(password) {
      return this.update({ password });
    }

    static async createAVoter({ voterid, password, electionID }) {
      return await this.create({
        voterid,
        password,
        electionID,
        votedOrNot: false,
      });
    }

    static async getNumberOfVoterss(electionID) {
      return await this.count({
        where: {
          electionID,
        },
      });
    }

    static async gettVoters(electionID) {
      return await this.findAll({
        where: {
          electionID,
        },
        order: [["id", "ASC"]],
      });
    }

    static async getVoter(id) {
      return await this.findOne({
        where: {
          id,
        },
      });
    }

    static async deleteAVoter(id) {
      return await this.destroy({
        where: {
          id,
        },
      });
    }

    static associate(models) {
      // define association here
      voterModel.belongsTo(models.electionModel, {
        foreignKey: "electionID",
      });
    }
  }
  model_voter.init({
    voter_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    voted:  {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "voter",
    }
  }, {
    sequelize,
    modelName: 'model_voter',
  });
  return model_voter;
};