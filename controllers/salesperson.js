const express = require('express');
const router = express.Router();
const Salesperson = require('../models/salesperson.js');
const Invoice = require('../models/invoice.js');

router.get('/:name', (req, res, next) => {
    Salesperson.findOne({ name: req.params.name })
        .exec((err, salesperson) => {
            if (err) {
                console.log(err);
            } else {
                Invoice
                    .find({ _salespersonId: salesperson._id })
                    .exec((err, invoices) => {
                        if (err) {
                            console.log(err);
                        } else {
                            salesperson.invoices = invoices;
                            res.render('salesperson/index', { salesperson: salesperson });
                        }
                    });
            }
        });
});

module.exports = router;