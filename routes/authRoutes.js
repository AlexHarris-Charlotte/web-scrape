const router = require('express').Router();
const passport = require('passport');
// const passportSetup = require('../public/server-side/passport');

router.get('/login', (req, res) => {
    // Need to make a handlebars login page
    // res.render('/login');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/profile');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile')
});

module.exports = router;