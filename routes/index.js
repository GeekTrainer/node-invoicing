var express = require('express');
var router = express.Router();
var Salesperson = require('../models/salesperson.js');

router.get('/', (req, res, next) => {
  // if(Salesperson.count() === 0) {
  //   require('../creatData.js')();
  // }
  console.log(Salesperson.count());
  Salesperson.find().select('name _id').sort('name').exec((err, salespeople) => {
    console.log('here');
    if(!err) {
      res.render('index', {salespeople: salespeople});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
