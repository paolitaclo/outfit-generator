var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var outfit = require('./routes/outfit');
var newClothes = require('./routes/newClothes');
var clothesList  = require('./routes/clothesList');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express();
var db;

app.all('*', function(req, res, next) {
  req.db = db;
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname,
  '/node_modules/')));

app.use('/outfit', outfit);
app.use('/newClothes', newClothes);
app.use('/clothesList', clothesList);
// Connection URL
var url = 'mongodb://localhost:27017/outfit-generator';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, database) {
  assert.equal(null, err);
  db = database;
  console.log("Connected successfully to server");
  var server = app.listen(3000, function() {
    console.log('Outfit Generator listening on: 3000!');
  });
  // server.close(function() {
  //   console.log('closing connection');
  //   db.close();
  // });
});
