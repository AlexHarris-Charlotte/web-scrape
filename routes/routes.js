const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/web-scrape');
const scrapeData = require('../public/server-side/scrape');
const webScrapeDB = require('../models');

// Home route
router.get('/', function (req, res) {
    res.render('home');
});

// Scrapes articles from the New York Times
router.get('/scrape', (req, res) => {
    scrapeData.getArticles()
        .then(results => {
            res.render('home', results);
        }).catch(errMessage => {
            console.log(errMessage);
        });
});

// Adds a specific article to the database
router.post('/addArticle', (req, res) => {
    const newEntry = new webScrapeDB.articles(req.body)
    newEntry.save();
});

// Send saved articles to a user
router.get('/savedArticles', (req, res) => {
    webScrapeDB.articles.find({})
        .populate('note')
        .then(savedArticles => {
            const data = {
                articles: savedArticles
            }
            // console.log(savedArticles);
            console.log(data.articles);
            res.render('savedArticles', data);
        })
});


// Delete a specific article from the database
router.delete('/deleteArticle', (req, res) => {
    const deleteId = req.body.id;
    webScrapeDB.articles.findByIdAndRemove(deleteId).exec();
    // need to delete corresponding note
});



router.post('/addNote/:id', (req, res) => {
    console.log(req.body);
    webScrapeDB.notes.create(req.body)
        .then( note => {
            return webScrapeDB.articles.findOneAndUpdate({ _id: req.params.id }, { note: note._id } , { new: true });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
          })
});


module.exports = router;