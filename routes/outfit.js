/* eslint new-cap: [2, {capIsNewExceptions: ["express.Router"]}]*/
var express = require('express');
var clothesModel = require('../models/clothesModel');
var router = express.Router();

router.route('/')
.get(function(req, res) {
  var criteria = req.query.criteria;
  clothesModel.findOutfit(req.db, criteria).then(function(outfit) {
    res.send(outfit);
  });
});

module.exports = router;
