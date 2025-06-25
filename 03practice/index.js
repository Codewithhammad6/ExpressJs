import express from 'express';
const app= express();

app.listen(4000, () => {
  console.log(`Connected Successfully http://localhost:${4000}`);
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1> <a href="/home">Home</a>');
});


app.get('/home', (req, res) => {
  res.render('home', { title: 'Home Page' });
} );
app.post('/submit', (req, res) => {
  const name=req.body.myname
  res.render('about',{ title: 'About Page', name });
} );


app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page' });
} );
