const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const scrapeData = require('../public/server-side/scrape');


router.get('/', function (req, res) {
    scrapeData.getArticles()
        .then(results => {
        const data = {
            title: [results[0], results[1]]
        }
        res.render('home', results);
    }).catch(errMessage => {
       console.log(errMessage);
    })
});
    


module.exports = router;