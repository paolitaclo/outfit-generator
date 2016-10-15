var express = require('express');
var clothesModel = require('../models/clothesModel');
var router = express.Router();

router.route('/')
  .post(function(req, res) {
    var newItem = req.body;
    var db = req.db;
    var promise = clothesModel.saveClothes(db, newItem);
    promise.then(function(result) {
      res.send(result);
    });
  });

  router.route('/:type')
    .get(function(req, res) {
      var list = req.params.type;
      var db = req.db;
      clothesModel.showClothesList(db, list).then(function(result){
        res.send(result)
      });
    });

module.exports = router;
