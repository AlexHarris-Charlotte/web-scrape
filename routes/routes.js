const express = require('express');
const router = express.Router();
const scrapeData = require('../public/server-side/scrape');


router.get('/', function (req, res) {
    scrapeData;
    res.render('home');
});


module.exports = router;