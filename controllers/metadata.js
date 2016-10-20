const express = require('express');
const router = express.Router();

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