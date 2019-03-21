'use strict';
// 3/16/2019 David Churn cloned

// third party
const bodyParser = require('body-parser');  // JSON parser
const cors = require('cors');  // security
const express = require('express');  // handles server events
const {sequelize} = require ('./database/connection');
const {Op} = require('./database/connection');
const {Game} = require('./models/games');
const {Play} = require('./models/plays');

let corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors({corsOptions}));
app.use(bodyParser.json());

//===>  Games Code
// get the Game information
app.get('/games', (req,res) => {
  Game.findAll ({
  })
  .then (games => {
    res.send(games);
  })
  .catch ((error) => {
    res.send(error);
  })
})

//  get named game ignoring edition
app.get('/game/name/:name', (req,res) => {
  Game.findAll({
    where : { nameTx: { [Op.like]: decodeURIComponent(req.params.name) + '%' }}
  })
  .then (game => {
    res.send(game);
  })
  .catch ((error) => {
    res.send(error);
  })

})//  get named game with edition
app.get('/game/name/:name/edition/:edition', (req,res) => {
  let editionStr = decodeURIComponent(req.params.edition);
  if (req.params.edition === '') {
    editionStr = null;
  }
  Game.findOne({
    where : {
      nameTx : decodeURIComponent(req.params.name),
      editionTx: editionStr
      }
  })
  .then (game => {
    res.send(game);
  })
  .catch ((error) => {
    res.send(error);
  })
})

// Add a new game
app.post ('/addgame', (req,res) => {
  Game.create({
    nameTx : req.body.nameTx,
    editionTx : req.body.editionTx,
    designerNm : req.body.designerNm,
    companyNm : req.body.companyNm,
    descriptionTx : req.body.descriptionTx,
    ratingQt : req.body.ratingQt,
    playerMinYr : req.body.playerMinYr,
    playerMinQt : req.body.playerMinQt,
    playerMaxQt : req.body.playerMaxQt,
    playerBestQt : req.body.playerBestQt,
    timeMinQt : req.body.timeMinQt,
    timeMaxQt : req.body.timeMaxQt,
    shrinkIn : req.body.shrinkIn,
    rulesIn : req.body.rulesIn,
    liquidateCd : req.body.liquidateCd,
    keywordsTx : req.body.keywordsTx
  })
  .then (game => {
    res.send(game);
  })
  .catch ((error) => {
    res.send(error);
  })
})

// Update all the columns for one game
app.put ('/chggame/:id', (req,res) => {
  Game.update({
    nameTx : req.body.nameTx,
    editionTx : req.body.editionTx,
    designerNm : req.body.designerNm,
    companyNm : req.body.companyNm,
    descriptionTx : req.body.descriptionTx,
    ratingQt : req.body.ratingQt,
    playerMinYr : req.body.playerMinYr,
    playerMinQt : req.body.playerMinQt,
    playerMaxQt : req.body.playerMaxQt,
    playerBestQt : req.body.playerBestQt,
    timeMinQt : req.body.timeMinQt,
    timeMaxQt : req.body.timeMaxQt,
    shrinkIn : req.body.shrinkIn,
    rulesIn : req.body.rulesIn,
    liquidateCd : req.body.liquidateCd,
    keywordsTx : req.body.keywordsTx
  },{
    where: {
      gameID : req.params.id
    }
  })
  .then (game => {
    res.send(game);
  })
  .catch ((error) => {
    res.send(error);
  })
})

//  Delete one game
app.delete ('/delgame/:id', (req,res) => {
  Game.destroy({
    where: {
      gameID : req.params.id
    }
  })
  .then (game => {
    res.send(String(game));
  })
  .catch ((error) => {
    res.send(error);
  })
})

//===>  plays Code
// get a list of the play lines.
app.get('/plays', (req,res) => {
  Play.findAll({
  })
  .then (plays => {
    res.send(plays);
  })
  .catch ((error) => {
    res.send(error);
  })
})

app.post ('/addplay', (req,res) => {
  Play.create({
    nameTx : req.body.nameTx,
    editionTx : req.body.editionTx,
    startDtTm : req.body.startDtTm,
    endDtTm : req.body.endDtTm,
    playerQt : req.body.playerQt,
    ratingQt : req.body.ratingQt,
    winCd : req.body.winCd
  })
  .then (play => {
    res.send(play);
  })
  .catch ((error) => {
    res.send(error);
  })
})
// Update all the columns for one play
app.put ('/chgplay/:id', (req,res) => {
  Play.update({
    nameTx : req.body.nameTx,
    editionTx : req.body.editionTx,
    startDtTm : req.body.startDtTm,
    endDtTm : req.body.endDtTm,
    playerQt : req.body.playerQt,
    ratingQt : req.body.ratingQt,
    winCd : req.body.winCd
  },{
    where: {
      playID : req.params.id
    }
  })
  .then (play => {
    res.send(play);
  })
  .catch ((error) => {
    res.send(error);
  })
})

//  Delete one play
app.delete ('/delplay/:id', (req,res) => {
  console.log(req.params);
  Play.destroy({
    where: {
      playID : req.params.id
    }
  })
  .then (play => {
    res.send(String(play));
  })
  .catch ((error) => {
    res.send(error);
  })
})


// what port should I listen for queries?
app.listen(3000, () => {
  console.log(`>>>Gamer server started<<<`);
})
