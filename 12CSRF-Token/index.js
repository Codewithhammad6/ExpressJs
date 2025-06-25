// CSRF Token = Extra hidden password
// Jo form ke sath bhejna zaroori hota hai
// Sirf asli user ke pass hota hai — hacker ke pass nahi



// npm install cookie-parser csurf

// const cookieParser = require('cookie-parser');
// const csrf = require('csurf');

// app.use(cookieParser());
// const csrfProtection = csrf({ cookie: true });

// app.get('/form', csrfProtection, (req, res) => {
//   res.render('form', { csrfToken: req.csrfToken() });
// });

// app.post('/submit', csrfProtection, (req, res) => {
//   // Handle form submission
// });












const express = require('express');
const app = express();
const cookieParser=require('cookie-parser');
const csrf = require('csurf');


//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('view engine', 'ejs');


const csrfProtection = csrf({ cookie: true });
app.use(cookieParser());




//Routes
app.get('/', (req, res) => {
res.send("<h1>Home Page</h1>")
});

app.get('/myform',csrfProtection, (req, res) => {
res.render("myform",{csrfToken: req.csrfToken()})
});

app.post('/submit', csrfProtection, (req, res) => {
  res.send(req.body)
});

app.listen(4000, () => {
console.log(`Successfully running http://localhost:4000`);
});