var express = require('express');
var router = express.Router();
var Invoice = require('../models/invoice.js');

router.get('/products', function (req, res, next) {
    Invoice.distinct('items.name', function (err, data) {
        if (!err) res.json(data);
    });
});

router.get('/states', function (req, res, next) {
    Invoice.distinct('state', function (err, data) {
        if (!err) res.json(data);
    })
});

router.get('/:id', function (req, res, next) {
    Invoice.findById(req.params.id).exec(function (err, invoice) {
        if (err) res.json(err);
        else res.json(invoice);
    });
});

router.post('/', function(req, res, next) {
    var invoice = JSON.parse(req.body.invoice);
    Invoice.create(invoice, function(err) {
        if(err) {
            console.log(err);
            res.status(500).end();
        } else {
            res.status(202).end();
        }
    });
});

router.put('/:id', function (req, res, next) {
    var invoice = JSON.parse(req.body.invoice);
    Invoice.update({ _id: invoice.id }, invoice, function (err) {
        if(err) {
            console.log(err);
            res.status(500).end();
        } else {
            res.status(202).end();
        }
    });
});

module.exports = router;