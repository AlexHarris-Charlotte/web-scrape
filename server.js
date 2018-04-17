// Instantiate Express
const express = require('express');
const app = express();

// Helper Packages
const mongoose = require('mongoose');

// not sure if these are needed in this file
const cheerio = require('cheerio');
const request = require('request');

// Set up Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Handlebars engine
const exphbs  = require('express-handlebars');
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
// Connect to Routes
const routes = require('./routes/routes');
app.use(routes);



app.listen(3000, () => {
    console.log('listening on port 3000');
});