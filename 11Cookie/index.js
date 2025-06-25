// // npm install cookie-parser

// const cookieParser = require('cookie-parser');
// app.use(cookieParser())
// app.use(cookieParser('secretkey'))       //Signed Cookies



// // Store Cookie

// res.cookie('key', 'value',
// {
// maxAge: 86400000,      //1000 * 60 * 60 * 24,
// httpOnly:true,
// secure: true,          //https://
// sameSite: 'strict',    //'lax' / 'none'
// signed: true
// });

// // Read Cookie
// res.send(req.cookies.key)
// // Delete Cookie
// res.clearCookie('key')












const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
// app.use(cookieParser());
app.use(cookieParser('secretkey123')); // For signed cookies



// Routes
app.get('/', (req, res) => {
 const username = req.cookies.username;
  if (!username) {
    return res.status(404).send('Cookie not found');
  }
  res.send(`Cookie found: ${username}`);
});

app.get('/set-cookie', (req, res) => {
 res.cookie('username', "Hammad",{
    maxAge:900000,
    httpOnly:true,
    signed: true   // For signed cookies
 });
 res.send('Cookie has been set');
});

app.get('/get-cookie', (req, res) => {
    // const username = req.cookies.username;
    const username = req.signedCookies.username;
  if (!username) {
    return res.status(404).send('Home Page : Cookie not found');
  }
  res.send(`Home Page : Cookie found: ${username}`);
});

app.get('/delete-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie has been deleted');
});



// Start server
app.listen(4000, () => {
  console.log(`Server running at http://localhost:${4000}`);
});