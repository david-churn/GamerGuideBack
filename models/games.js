'use strict';
// 3/16/2019 David Churn cloned

const Sequelize = require('sequelize');
const {sequelize} = require('../database/connection.js');

const Game = sequelize.define('game', {
  gameID: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  updateDtTm: {
    type: Sequelize.DATE
  },
  nameTx: {
    type: Sequelize.CHAR(45),
    allowNull: false
  },
  editionTx: {
    type: Sequelize.CHAR(20)
  },
  designerNm: {
    type: Sequelize.CHAR(45)
  },
  companyNm: {
    type: Sequelize.CHAR(45)
  },
  descriptionTx: {
    type: Sequelize.STRING
  },
  ratingQt: {
    type: Sequelize.TINYINT,
    validate: {
      min : 1,
      max : 5
    }
  },
  playerMinYr: {
    type: Sequelize.TINYINT,
    validate: { min: 0 }
  },
  playerMinQt: {
    type: Sequelize.TINYINT,
    allowNull: false,
    validate : { min: 1 }
  },
  playerMaxQt: {
    type: Sequelize.TINYINT,
    allowNull: false,
    validate : { min: 1 }
  },
  playerBestQt: {
    type: Sequelize.TINYINT,
    allowNull: false,
    validate : { min: 1 }
  },
  timeMinQt: {
    type: Sequelize.SMALLINT,
    allowNull: false,
    validate : { min: 1 }
  },
  timeMaxQt: {
    type: Sequelize.SMALLINT,
    allowNull: false,
    validate : { min: 1 }
  },
  shrinkIn: {
    type: Sequelize.TINYINT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1
    }
  },
  rulesIn: {
    type: Sequelize.TINYINT,
    allowNull: false,
    validate: {
      min: 0,
      max: 1
    }
  },
  liquidateCd: {
    type: Sequelize.CHAR(1),
    allowNull: false
  },
  keywordsTx: {
    type: Sequelize.STRING
  }
}, {
  timestamps:false
});

module.exports = {
  Game
};
