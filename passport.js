const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: '597553148438-d05anlgbker7qtqrlcvgeqn2oqjpre1q.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
));