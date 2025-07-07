// https://www.passportjs.org/packages/passport-google-oauth20/
// https://www.npmjs.com/package/passport
// OAuth Authentication

//kisi bhi 3rd party website jasay google facebook kay through login krwa saktay hain


// $ npm install passport-google-oauth20

// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));


//          ya passport kay inbuilt methods hain
// req.isAuthenticated()
// req.user
// req.login(user, callback)
// req.logout(callback)








const express = require('express');
const passport = require('passport');
const app = express();
const session = require('express-session')
require('./auth/google')
const port = 4000;

//Session setup
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
}))


//passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>')
});


app.get('/auth/google',
  passport.authenticate(
    'google',
 { scope: ['profile','email'] }
));

app.get('/auth/google/callback', 
  passport.authenticate('google', 
    { 
        failureRedirect: '/' ,
        successRedirect:'/profile'
    }),
);


function authCheck(req, res, next){
if(req.isAuthenticated()) {
return next()
}
res.redirect('/')
}



app.get('/profile',authCheck, (req, res) => {
    console.log(req.user);
res.send(`<h1>Welcome ${req.user.displayName} <br>  <img src="${req.user.photos[0].value}">  </h1>
    <a href='/logout'>Logout</a>
    `)
});


app.get('/logout', (req, res) => {
req.logOut(()=>{
    res.redirect('/')
})
});




app.listen(port, () => {
    console.log(`Successfully Connected http://localhost:${port}`)
});
