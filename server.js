// Cool Techs to integrate into this app
// Passport Authentication
// css keyframes
const express = require('express');
const app = express();
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./public/server-side/passport'); 
const mongoose = require('mongoose');
const webScrapeDB = require('./models');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const routes = require('./routes/routes');
const authRoutes = require('./routes/authRoutes');


app.use(express.static('public'));

// Cookie
app.use(cookieSession({
    maxAge: 3 * 60 * 60 * 1000,
    keys: [keys.cookie.encrypt]
}));

// Passport Set up
app.use(passport.initialize());
app.use(passport.session());

// Connect Mongoose to our web-scrape db
mongoose.connect("mongodb://localhost/web-scrape");

// Set up Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Handlebars engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
// Connect to Routes
app.use(routes);
app.use('/auth', authRoutes);



app.listen(8080, () => {
    console.log('listening on port 8080');
});