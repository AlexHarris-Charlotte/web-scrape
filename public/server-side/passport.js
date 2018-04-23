const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../../config/keys');
const User = require('../../models/users');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then( user => {
        done(null, user)
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then(currentUser => {
            if (currentUser) {
                console.log(`User is ${currentUser}`);
                done(null, currentUser);
            } else {
                new User({
                    googleId: profile.id,
                    userName: profile.displayName
                }).save().then(newUser => {
                    console.log(`Created new User ${newUser}`);
                    done(null, newUser);
                });
            };
        });
    }
));

