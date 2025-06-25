//bcrypt pasword ko encrypt/hashing krnay kay liay use hota hai

// npm install bcryptjs

// const bcrypt = require('bcryptjs');
// const hashedPassword = bcrypt.hash (password, 10);
// const isMatch = bcrypt.compare('admin123', hashedPassword);







const express= require('express');
const app = express();
const session=require('express-session');
const bcrypt = require('bcryptjs');
const mongoose= require('mongoose');

const User = require('./model/user.model'); // Import the User model

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/user-crud').then(()=>{
    console.log('Connected to MongoDB');
})


app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON bodies


// Session middleware
app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: false
}));



// Middleware to check if user is authenticated
const checkLogin = ((req, res, next) => {
  if (req.session.user) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.redirect('/login'); // User is not authenticated, redirect to login page
  }
});





//Routes
app.get('/',checkLogin, (req, res) => { 
  res.send(`<h1>Home Page</h1> 
    <p>Hello, ${req.session.user}</p>   
    <a href="/logout">Logout</a>`);
});




app.get('/login', (req, res) => {
    if(req.session.user){           // If user is already logged in, redirect to home page
       return res.redirect('/')
    }else{
        res.render('login',{ error: null }); // Render the login page with no error
    }
});

app.post('/login',async (req, res) => {
    const { username, userpassword } = req.body;
    // Find the user by username
    const user = await User.findOne({username})
    if(!user) return res.render('login',{error:'Invalid username'})

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(userpassword, user.userpassword);
    if (!isMatch) {
      return res.render('login',{error:'Invalid password'})
    }
    req.session.user=username
    res.redirect('/');
});


app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});


app.get('/register', (req, res) => {
  res.render('register',{ error: null });
});

app.post('/register',async (req, res) => {
    // Hash the password before saving it
    const { username, userpassword } = req.body;
    const hashedPassword = await bcrypt.hash(userpassword, 10);
       const user1 = await User.findOne({username})
    if(user1) {return res.render('register',{error:'Allready exist username'})}
else{
    const user=await User.create({username, userpassword: hashedPassword});
    if(user){
        res.redirect('/login');
    } else {
        res.redirect('/register');
    }
}

});


app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});