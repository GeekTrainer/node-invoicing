var express = require('express');
var router = express.Router();
var Salesperson = require('../models/salesperson.js');

router.get('/:name', (req, res, next) => {
    Salesperson.findOne({ name: req.params.name }).exec((err, salesperson) => {
        if(err) {
            console.log(err);
        } else {
            res.render('salesperson/index', {salesperson: salesperson});
        }
    });
});

module.exports = router;