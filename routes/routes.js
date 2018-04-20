const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const scrapeData = require('../public/server-side/scrape');
const webScrapeModel = require('../models/scrapeModel');


router.get('/', function (req, res) {
    res.render('home');
});


router.get('/scrape', (req, res) => {
    scrapeData.getArticles()
        .then(results => {
        const data = {
            title: [results[0], results[1]]
        }
        res.render("home", results);
    }).catch(errMessage => {
       console.log(errMessage);
    });
});

router.post('/addArticle', (req, res) => {
    console.log('addArticle');
    console.log(req.body);
    console.log(req.body.title);
})
    


module.exports = router;