var express = require('express');
var router = express.Router();
var Invoice = require('../models/invoice.js');
var BaseController = require('./base-controller');

var baseController = new BaseController(Invoice);

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

router.get('/:id', baseController.getOne);

router.post('/', baseController.post);

router.put('/:id', baseController.put);

router.delete('/:id', baseController.delete);

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