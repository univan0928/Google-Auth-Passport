const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');
  
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
    
  
app.get('/', (req, res) => {
    res.send("<button><a href='/auth'>Login With Google</a></button>")
});
  
// Auth 
app.get('/auth' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}));
  
// Auth Callback
app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/callback/success',
        failureRedirect: '/auth/google/callback/failure'
}));
  
// Success 
app.get('/auth/google/callback/success' , (req , res) => {
    if(!req.user)
        res.redirect('/auth/callback/failure');
    res.send("Welcome " + req.user.email);
});
  
// failure
app.get('/auth/google/callback/failure' , (req , res) => {
    res.send("Error");
})
  
app.listen(3000 , () => {
    console.log("Server Running on port 3000");
});