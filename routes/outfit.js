/* eslint new-cap: [2, {capIsNewExceptions: ["express.Router"]}]*/
var express = require('express');
var clothesModel = require('../models/clothesModel');
var router = express.Router();
// var test = require('../models/test');

router.route('/')
.post(function(req, res) {
  var criteria = req.body.criteria;
  clothesModel.findOutfit(req.db, criteria).then(function(outfit) {
    res.send(outfit);
  });
});

module.exports = router;
