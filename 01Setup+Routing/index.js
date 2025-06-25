import { name } from 'ejs';
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




// app.get('/user', (req, res) => {
//   res.render('user', {title:"User Page",message:""});
// });




// app.get('/about', (req, res) => {
// res.render('about', {title:"About Us", users: ['Alice', 'Bob', 'Charlie', 'David'] });
// });



// app.get('/about', (req, res) => {
//   let users = ['Alice', 'Bob', 'Charlie', 'David'];
// res.render('about', {title:"About Us", users });
// });




// app.get('/about', (req, res) => {
//   var user = [
// {name: 'Akshay Kumar', age: 25, city: 'Delhi'},
//  {name: 'Salman Khan', age: 24, city: 'Mumbai'}, 
//  {name: 'Shahid Kapoor', age: 23,city: 'Goa'}, 
//  {name: 'John Abraham', age: 22,city: 'Delhi'},
//   {name: 'Kartrina Kaif', age: 23,city: 'Agra'}
// ];

// res.render('about', {title:"About Us", user });
// });













//             Form Submission
//             Partials
//      Serving Static Files (CSS, JS, Images)




// app.get('/form', (req, res) => {
// res.render('form')
// }) 
// app.post('/submit', (req, res) => {
// const name= req.body.myname
// res.send(`Form submitted successfully. Name: ${name}`);
// }) 



// app.get('/contact', (req, res) => {
//   res.render('contact', { title: "Form Page" });
// }
// );
// app.post('/submit',(req, res) => {
//   const {myname, myemail, mypassword} = req.body;
//   res.send(`Name: ${myname}<br> Email : ${myemail}<br> Password: ${mypassword}`);
// })






//   agar usi form wale page par data show karna ho to


// app.get('/form', (req, res) => {
// res.render('form',{name:null})
// });

// app.post('/submit', (req, res) => {
// const name= req.body.myname
// res.render('form', { name });
// }) 





