var express = require('express');
var router = express.Router();
var Salesperson = require('../models/salesperson.js');

router.get('/', (req, res, next) => {
  Salesperson.find().select('name _id').sort('name').exec((err, salespeople) => {
    if(!err) {
      console.log(salespeople);
      res.render('index', {salespeople: salespeople});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
