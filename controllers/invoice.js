var express = require('express');
var router = express.Router();
var Invoice = require('../models/invoice.js');

router.get('/salesperson/:id', function(req, res) {
    Invoice.find({ salespersonId: req.params.id}).exec(function(err, invoices) {
        if(err) {
            console.log(err);
            req.status(500).end();
        } else {
            res.json(invoices)
        }
    })
});

router.get('/products', function (req, res, next) {
    res.json([
        'Filters',
        'Coffee Machine',
        'Coffee Pot',
        'Mug',
        'Assorted Teas',
        'Flavored Creamer',
        'Sugar',
        'Thermos',
        'Stirrers',
        'Coffee Beans'
    ]);
});

router.get('/states', function (req, res, next) {
    res.json(['Open', 'Closed']);
});

router.get('/:id', function (req, res, next) {
    Invoice.findById(req.params.id).exec(function(err, invoice) {
        if(err) {
            console.log(err);
            res.status(500).end();
        } else {
            res.json(invoice);
        }
    });
});

// router.post('/', function(req, res, next) {
//     var invoice = JSON.parse(req.body.invoice);
//     Invoice.create(invoice, function(err) {
//         if(err) {
//             console.log(err);
//             res.status(500).end();
//         } else {
//             res.status(202).end();
//         }
//     });
// });

router.put('/:id', function (req, res, next) {
    var invoice = JSON.parse(req.body.invoice);
    console.log(invoice);
    try {
        SalesPerson.update({ 'invoices._id': invoice.id }, { 'invoices.$': invoice }, function (err) {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(202).end();
            }
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;