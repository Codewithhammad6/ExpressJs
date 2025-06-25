import express from 'express';
const app= express();

app.listen(4000, () => {
  console.log(`Connected Successfully http://localhost:${4000}`);
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Home Page');
});


app.get('/home', (req, res) => {
  res.render('home', { title: 'Home Page' });
} );

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page' });
} );
