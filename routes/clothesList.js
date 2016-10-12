var express = require('express');
var clothesModel = require('../models/clothesModel');
var router = express.Router();

router.route('/:type')
  .get(function(req, res) {
    var list = req.params.type;
    var db = req.db;
    clothesModel.showClothesList(db, list).then(function(result){
      res.send(result)
    });
  });

  module.exports = router;
