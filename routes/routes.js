const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const scrapeData = require('../public/server-side/scrape');
// const webScrapeDB = require('../models/scrapeModel');

mongoose.connect("mongodb://localhost:27017/web-scrape");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
const webScrape = new Schema({
    title: {type: String, default: 'No Title'},
    summary: {type: String, default: 'No Summary'},
    link: {type: String, default: 'No Link'},
    image: {type: String, default: 'No Image'},
    note: {type: String, default: null}
});

const webScrapeDB = mongoose.model("webScrape", webScrape)

router.get('/', function (req, res) {
    res.render('home');
});


router.get('/scrape', (req, res) => {
    scrapeData.getArticles()
        .then(results => {
            res.render("home", results);
        }).catch(errMessage => {
            console.log(errMessage);
        });
});

router.post('/addArticle', (req, res) => {
    console.log("Storing data to database");
    const data = {
        title    : req.body.title,
        summary  : req.body.summary,
        link     : req.body.link,
        image    : req.body.image  
    };

    const newEntry = new webScrapeDB(data)
    newEntry.save();
});

router.get('/savedArticles', (req, res) => {
    webScrapeDB.find()
        .then(savedArticles => {
            const data = {
                articles: savedArticles
            }
            res.render("savedArticles", data);
        })
});

router.delete('/deleteArticle', (req, res) => {
    const deleteId = req.body.id;
    console.log(deleteId);
    webScrapeDB.findByIdAndRemove(deleteId).exec();
    // I then want to find all of the articles still in the db
    // then re-render the page without the deleted article
});

router.put('/addNote', (req, res) => {
    console.log(req.body.note);
    console.log(typeof(req.body.note));
    webScrapeDB.findByIdAndUpdate({id : req.body.id}, {title: req.body.note}, {new: true});
    webScrapeDB.find({})
        .then( stuff => {
            console.log(stuff);
        })
    res.send("note sent to server");
});
    


module.exports = router;