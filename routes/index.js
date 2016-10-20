var express = require('express');
var router = express.Router();
var Salesperson = require('../models/salesperson.js');

router.get('/', (req, res, next) => {
  Salesperson.find().select('name _id').sort('name').exec((err, salesPeople) => {
    if(!err) {
      console.log(salesPeople);
      res.render('index', {salesPeople: salesPeople});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
