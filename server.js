// Cool Techs to integrate into this app
// Passport Authentication
// css keyframes

// Use handlebars if helper to render
// a notes button to view notes of an article

// Instantiate Express
const express = require('express');
const app = express();
app.use(express.static('public'));

// Mongoose Set up
const mongoose = require('mongoose');
// Connect Mongoose to our web-scrape db
mongoose.connect("mongodb://localhost/web-scrape");
const webScrapeDB = require('./models');

// Set up Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Handlebars engine
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
// Connect to Routes
const routes = require('./routes/routes');
app.use(routes);



app.listen(8080, () => {
    console.log('listening on port 8080');
});