// npm install express-session

// const session = require("express-session");

// app.use(
//   session({
//     secret: "mysecretkey",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 86400000 },
//   })
// );



// Store Session
//     req.session.key = 'value';

// Read Session
//    res.send(req.session.key)

// Delete Session
//    req.session.destroy()











// const express = require("express");
// const app = express();
// const session=require('express-session')


// app.use(session({
//     secret:'secretpassword',
//     resave:false,
//     saveUninitialized:false,
//     cookie:{maxAge: 1000*60*60*24}  //1 din tak session bana rhay ga
//     // cookie:{maxAge: 1000*30}    // 1 min bade seesion ki value delete ho jay gi
// }))


// //jab tak set-username walay route pr nhi jay gay kisi bhi route may sesion say value nhi jay gi bcz set walay route may session ban rha ha or phir wo baki all route may show hoga

// app.get("/", (req, res) => {
//      if(req.session.username){
//     res.send(`<h4>Username from session is: ${req.session.username}</h4>`);
//     }else{
//         res.send("<h4>No username has been found.</h4>");
//     }
// });

// app.get("/set-username", (req, res) => {
//     req.session.username="Hammad"
//     res.send("<h4>Username has been set in session.</h4>");
// });

// app.get("/aboutus", (req, res) => {
//      if(req.session.username){
//     res.send(`<h4>Username from session is: ${req.session.username}</h4>`);
//     }else{
//         res.send("<h4>No username has been found.</h4>");
//     }
// });

// app.get("/get-username", (req, res) => {
//     if(req.session.username){
//     res.send(`<h4>Username from session is: ${req.session.username}</h4>`);
//     }else{
//         res.send("<h4>No username has been found.</h4>");
//     }
// });


// //agar session ki without cookie khud hi delete krna ha

// app.get("/destroy", (req, res) => {
// req.session.destroy((err)=>{
//     if(err){
//         res.status(500).send("Failed to destroy session.")
//     }
//         res.send("<h4>Session destroy successfully.</h4>");
// })
// });



// app.listen(4000, () => {
//   console.log(`Successfully Connected http://localhost:${4000}`);
// });












//session user kay data ko ram may store krta ha pr agar zaida users a jay phir is liay database use krtay hain

//npm install connect-mongo
//const MongoStore = require('connect-mongo')

// app.use(session({
//     secret:'foo',
//     store:MongoStore.create()
// }))





const express = require("express");
const app = express();
const session=require('express-session')
const MongoStore = require('connect-mongo')

app.use(session({
    secret:'secretpassword',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge: 1000*60*60*24},  //1 din tak session bana rhay ga
    store:MongoStore.create({mongoUrl:'mongodb://127.0.0.1:27017/sessiondb',
    collectionName:'mysessions'
    })
}))


//jab tak set-username walay route pr nhi jay gay kisi bhi route may sesion say value nhi jay gi bcz set walay route may session ban rha ha or phir wo baki all route may show hoga

app.get("/", (req, res) => {
     if(req.session.username){
    res.send(`<h4>Username from session is: ${req.session.username}</h4>`);
    }else{
        res.send("<h4>No username has been found.</h4>");
    }
});

app.get("/set-username", (req, res) => {
    req.session.username="Hammad"
    res.send("<h4>Username has been set in session.</h4>");
});

app.get("/aboutus", (req, res) => {
     if(req.session.username){
    res.send(`<h4>Username from session is: ${req.session.username}</h4>`);
    }else{
        res.send("<h4>No username has been found.</h4>");
    }
});

app.get("/get-username", (req, res) => {
    if(req.session.username){
    res.send(`<h4>Username from session is: ${req.session.username}</h4>`);
    }else{
        res.send("<h4>No username has been found.</h4>");
    }
});


//agar session ki without cookie khud hi delete krna ha

app.get("/destroy", (req, res) => {
req.session.destroy((err)=>{
    if(err){
        res.status(500).send("Failed to destroy session.")
    }
        res.send("<h4>Session destroy successfully.</h4>");
})
});



app.listen(4000, () => {
  console.log(`Successfully Connected http://localhost:${4000}`);
});

