// Cool Techs to integrate into this app
// Passport Authentication
// css keyframes


// Instantiate Express
const express = require('express');
const app = express();
app.use(express.static('public'));

// Mongoose Set up
const mongoose = require('mongoose');
// Connect Mongoose to our web-scrape db
mongoose.connect("mongodb://localhost/web-scrape");
const webScrapeModel = require('./models/scrapeModel');

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



app.listen(3000, () => {
    console.log('listening on port 3000');
});