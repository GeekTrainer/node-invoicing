var express = require('express');
var router = express.Router();
var Invoice = require('../models/invoice.js');

router.get('/salesperson/:id', function (req, res) {
    Invoice.find({ _salespersonId: req.params.id }).exec(function (err, invoices) {
        if (err) {
            console.log(err);
            req.status(500).end();
        } else {
            res.json(invoices)
        }
    })
});

router.get('/:id', function (req, res) {
    Invoice.findById(req.params.id).exec(function (err, invoice) {
        if (err) {
            console.log(err);
            res.status(500).end();
        } else {
            res.json(invoice);
        }
    });
});

router.post('/', function(req, res) {
    var invoice = new Invoice(req.body.invoice);
    invoice.save(function(err) {
        if(err) {
            console.log(err);
            res.status(500).end();
        } else {
            res.json(invoice);
        }
    });
});

router.put('/:id', function (req, res) {
    try {
        Invoice.findOneAndUpdate({ _id: req.params.id }, JSON.parse(req.body.invoice), {new: true}).exec(function (err, invoice) {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.json(invoice);
            }
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/products', function (req, res) {
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



module.exports = router;