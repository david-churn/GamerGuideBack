'use strict';
// 3/16/2019 David Churn cloned

const Sequelize = require('sequelize');
const {sequelize} = require('../database/connection.js');



const Play = sequelize.define('play', {
  playID: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nameTx: {
    type: Sequelize.CHAR(45),
  },
  editionTx: {
    type: Sequelize.CHAR(20)
  },
  startDtTm: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDtTm: {
    type: Sequelize.DATE,
    allowNull: false
  },
  playerQt: {
    type: Sequelize.TINYINT,
    allowNull: false,
    validate : { min: 1 }
  },
  ratingQt: {
    type: Sequelize.TINYINT,
    allowNull: false,
    validate: {
      min : 1,
      max : 5
    }
  },
  winCd: {
    type: Sequelize.CHAR(10)
  }
}, {
  timestamps:false
});

Play.removeAttribute('id');

module.exports = {
  Play
};
