'use strict';
// 3/16/2019 David Churn cloned

// third party
const bodyParser = require('body-parser');  // JSON parser
const cors = require('cors');  // security
const express = require('express');  // handles server events
const {sequelize} = require ('./database/connection');
const {Game} = require('./models/games');
const {Play} = require('./models/plays');

let corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors({corsOptions}));
app.use(bodyParser.json());

// get an ordered list of the product lines.
app.get('/plays', cors(corsOptions), (request,response) => {
  Play.findAll({
  })
  .then (plays => {
    response.send(plays);
  })
  .catch ((error) => {
    response.send(error);
  })
})

// // get the Game information
// app.get('/games', cors(corsOptions), (request,response) => {
//   Game.findAll ({
//   })
//   .then (games => {
//     response.send(games);
//   })
//   .catch ((error) => {
//     response.send(error);
//   })
// })
//
// // Note the pool.escape function protects against SQL injection.  How?
// app.get('/product/:id', cors(corsOptions), (request,response) => {
//   Game.findOne({
//     where : { productCode : request.params.id }
//   })
//   .then (product => {
//     response.send(product);
//   })
//   .catch ((error) => {
//     response.send(error);
//   })
// })
//
// // Add a new product
// app.post ('/addgame', cors(corsOptions), (request,response) => {
//   Game.create({
//     productCode : request.body.productCode,
//     productName : request.body.productName,
//     productLine : request.body.productLine,
//     productScale : request.body.productScale,
//     productVendor : request.body.productVendor,
//     productDescription : request.body.productDescription,
//     quantityInStock : request.body.quantityInStock,
//     buyPrice : request.body.buyPrice,
//     MSRP : request.body.MSRP
//   })
//   .then (product => {
//     response.send(product);
//   })
//   .catch ((error) => {
//     response.send(error);
//   })
// })
//
// // Update all the columns for one product
// app.put ('/chggame/:id', cors(corsOptions), (request,response) => {
//   Game.update({
//     productName : request.body.productName,
//     productLine : request.body.productLine,
//     productScale : request.body.productScale,
//     productVendor : request.body.productVendor,
//     productDescription : request.body.productDescription,
//     quantityInStock : request.body.quantityInStock,
//     buyPrice : request.body.buyPrice,
//     MSRP : request.body.MSRP
//   },{
//     where: {
//       productCode : request.params.id
//     }
//   })
//   .then (product => {
//     response.send(product);
//   })
//   .catch ((error) => {
//     response.send(error);
//   })
// })
//
// //  Delete one product
// app.delete ('/delgame/:id', cors(corsOptions), (request,response) => {
//   Game.destroy({
//     where: {
//       productCode : request.params.id
//     }
//   })
//   .then (product => {
//     response.send(String(product));
//   })
//   .catch ((error) => {
//     response.send(error);
//   })
// })

// what port should I listen for queries?
app.listen(3000, () => {
  console.log(`>>>Gamer server started<<<`);
})
