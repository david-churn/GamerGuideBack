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
// get the latest game
app.get('/latestgame', (req,res) => {
  Game.findOne ({
      order: [['gameID','DESC']]
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
})
//  get named game with edition
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

//  post to allow a search query for the result
app.post('/searchgames', (req,res) => {
  let whereObj = {};
  if (req.body.nameTx) {
    whereObj.nameTx = {[Op.like]: req.body.nameTx + '%'};
  }
  if (req.body.editionTx) {
    whereObj.editionTx = {[Op.like]: req.body.editionTx + '%'};
  }
// s/b > pass ratingQt
  if (req.body.ratingQt) {
    whereObj.ratingQt = {[Op.gte]: req.body.ratingQt};
  }
// s/b <= maxAgeYr
  if (req.body.ageMinYr) {
    whereObj.playerMinYr = {[Op.lte]: req.body.ageMinYr} ;
  }
// s/b min <= passed <= max
  if (req.body.playerQt) {
    whereObj.playerMinQt = {[Op.lte]: req.body.playerQt} ;
    whereObj.playerMaxQt = {[Op.gte]: req.body.playerQt};
  }
// s/b min <= passed <= max
  if (req.body.timeQt) {
    whereObj.timeMinQt = {[Op.lte]: req.body.timeQt};
    whereObj.timeMaxQt = {[Op.gte]: req.body.timeQt};
  }
  if (req.body.keywordTx) {
    whereObj.keywordsTx = {[Op.like]: '%' + req.body.keywordTx + '%'};
  }
  // whereObj.order = ['rating','DESC','name','edition']
  Game.findAll({
    where : whereObj,
    order: [['ratingQt','DESC'],'nameTx','editionTx']
  })
  .then (game => {
    res.send(game);
  })
  .catch ((error) => {
    res.send(error);
  })
})

// Add a new game
app.post('/addgame', (req,res) => {
  let addShrinkIn = 0;
  if (req.body.shrinkIn) {
    addShrinkIn = 1;
  }
  let addRulesIn = 0;
  if (req.body.rulesIn) {
    addRulesIn = 1;
  }
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
    shrinkIn : addShrinkIn,
    rulesIn : addRulesIn,
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

// Update the shrink wrap code
app.patch('/gameshrink/:id', (req,res) => {
  let updShrinkIn = 0;
  if (req.body.shrinkIn) {
    updShrinkIn = 1;
  }
  Game.update({
    shrinkIn : updShrinkIn
  },{
    where: {
      gameID : req.params.id
    }
  })
})

// Update the rules code
app.patch('/gamerule/:id', (req,res) => {
  let updRulesIn = 0;
  if (req.body.rulesIn) {
    updRulesIn = 1;
  }
  Game.update({
    rulesIn : updRulesIn
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
// Update all the columns for one game
app.put('/chggame/:id', (req,res) => {
  let updShrinkIn = 0;
  if (req.body.shrinkIn) {
    updShrinkIn = 1;
  }
  let updRulesIn = 0;
  if (req.body.rulesIn) {
    updRulesIn = 1;
  }
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
    shrinkIn : updShrinkIn,
    rulesIn : updRulesIn,
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
app.delete('/delgame/:id', (req,res) => {
  Game.destroy({
    where: {
      gameID : req.params.id
    }
  })
  .then (game => {
    res.send(String(game));
  })
  .catch (error => {
    res.send(error);
  })
})

//===>  plays Code

// get the play statistics for a game.
app.get('/playstats/:name', (req,res) => {
  let responseObj = {};
  sequelize.query("select max(startDtTm) as lastPlayDtTm, count(*) as playQt, avg(ratingQt) as averageRatingQt from gamer.plays where nameTx = ? group by nameTx",
    { replacements: [ decodeURIComponent(req.params.name) ],
        type: sequelize.QueryTypes.SELECT })
  .then (plays => {
    responseObj = plays[0];
    return Play.count({
      where : {
        nameTx: decodeURIComponent(req.params.name),
        winCd: { [Op.like]: '%win%' }
      }
    })
  })
  .then (winQt => {
    responseObj.winQt = winQt;
    res.send(responseObj);
  })
  .catch ((error) => {
    res.send(error);
  })
})

// get a list of all the plays.
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

//  get named game's plays ignoring edition
app.get('/play/name/:name', (req,res) => {
  Play.findAll({
    where : { nameTx: { [Op.like]: decodeURIComponent(req.params.name) + '%' }}
  })
  .then (play => {
    res.send(play);
  })
  .catch ((error) => {
    res.send(error);
  })
})

app.post('/addplay', (req,res) => {
  console.log(req.body);
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
app.put('/chgplay/:id', (req,res) => {
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
