const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice.js');
const BaseController = require('./base-controller');

const baseController = new BaseController(Invoice);

router.get('/salesperson/:id', (req, res) => {
    Invoice
        .find({ _salespersonId: req.params.id })
        .exec((err, invoices) => {
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

router.get('/products', (req, res) => {
    console.log('------------- HERE -------------------');
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

router.get('/states', (req, res, next) => {
    res.json(['Open', 'Closed']);
});

module.exports = router;