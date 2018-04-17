const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const scrapeData = require('../public/server-side/scrape');


router.get('/', function (req, res) {
    scrapeData.getNBA()
        .then(results => {
        const data = {
            title: [results[0], results[1]]
        }
        console.log(typeof(results));
        console.log(results[0]);
        res.render('home', data);
    }).catch(errMessage => {
       // alert(errMessage);
    })
});
    


module.exports = router;