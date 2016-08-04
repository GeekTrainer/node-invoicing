var express = require('express');
var router = express.Router();
var Invoice = require('../models/invoice.js');

router.get('/:salesPerson', function(req, res, next) {
    var salesPerson = req.params.salesPerson;
    Invoice.find({'salesPerson': salesPerson}).sort('-state company').exec(function(err, invoices) {
        if(err) console.log(err);
        else if(!invoices) console.log('none found');
        else res.render('salesperson/index', {invoices: invoices, salesPerson: req.params.salesPerson});
    })
});

module.exports = router;