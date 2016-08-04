var express = require('express');
var router = express.Router();
var Invoice = require('../models/invoice.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  Invoice.distinct('salesPerson', function(err, salesPeople) {
    if(!err) {
      console.log(salesPeople);
      res.render('index', {salesPeople: salesPeople});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
