const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/web-scrape');
const scrapeData = require('../public/server-side/scrape');
const webScrapeDB = require('../models');

// Home route
router.get('/', function (req, res) {
    console.log(req.user);
    res.render('todo');
});

// Scrapes articles from the New York Times


//
//In this route I need to use a conditional to render based on if a user is logged in
//if a user is logged in. I will render the page with buttons to add articles
//if user not logged in. They cannot add articles
router.get('/scrape', (req, res) => {   
    scrapeData.getArticles()
        .then(results => {

            if (req.user) {
                res.render('scrapeLoggedIn', results);
            } else {
                res.render('scrapeNotLoggedIn', results);
            }

        }).catch(errMessage => {
            console.log(errMessage);
        });
});

// router.get('/profile', (req, res) => {
//     res.render('profile');
// });

// Adds a specific article to the database
router.post('/addArticle', (req, res) => {
    const newEntry = new webScrapeDB.articles(req.body)
    newEntry.save();
});



//
// In this route, if user logged in, show their articles
// else have a page that requests the user to log in to add articles
// Send saved articles to a user
router.get('/profile', (req, res) => {
    if (req.user) {
    webScrapeDB.articles.find({})
        .populate('note')
        .then(savedArticles => {
            const data = {
                articles: savedArticles
            }
            // console.log(savedArticles);
            console.log(data.articles);
            res.render('profileLoggedIn', data);
        })
    } else {
        res.render('profileNotLoggedIn');
    }
});


// Delete a specific article from the database
router.delete('/deleteArticle', (req, res) => {
    const deleteId = req.body.id;
    webScrapeDB.articles.findOne({_id: deleteId})
        .then(thing => {
            const noteId = thing.note;
            webScrapeDB.notes.findByIdAndRemove(noteId).exec();
        });
    webScrapeDB.articles.findByIdAndRemove(deleteId).exec();
    console.log('I think I deleted both');
});



router.post('/addNote/:id', (req, res) => {
    // console.log(req.body);
    webScrapeDB.notes.create(req.body)
        .then( note => {
            return webScrapeDB.articles.findOneAndUpdate({ _id: req.params.id }, { note: note._id } , { new: true });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
          })
});

module.exports = router;