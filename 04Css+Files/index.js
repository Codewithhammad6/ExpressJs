import express from 'express';
const app= express();

app.listen(4000, () => {
  console.log(`Connected Successfully http://localhost:${4000}`);
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// agar css ya static file add krni ho uska kisi bhi name say folder bana saktay hain jasay yaha public kay name say banaya
// or middlewire use krna hota hai
app.use(express.static('public')); //for static files


app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/home', (req, res) => {
  res.render('home', { title: 'Home Page' });
} );

