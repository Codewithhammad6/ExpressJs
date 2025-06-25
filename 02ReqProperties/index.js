//ExpressJS Request Properties & Methods




//                   Properties

// req.params
// req.query
// req.body
// req.cookies

// req.hostname
// req.ip
// req.ips
// req.method
// req.originalUrl
// req.path
// req.protocol
// req.secure
// req.route






//                        Methods


// req.accepts
// req.get
// req.is
// req.range
 





const express=require('express')
const app=express()

app.listen(4000, () => {
    console.log(`Successfull Connect http://localhost:${4000}`);
});
app.use(express.json())      //middelwire
app.use(express.urlencoded({extended:false}))  //middelwire
app.set('view engine','ejs')  //middelwire for ejs

app.get('/',(req,res)=>{
    res.send("Welcome")
})





//                  req.params

// app.get('/user/:userid',(req,res)=>{           
//   res.send(req.params)
// })


// // app.get('/floor/:number/book/:name',(req,res)=>{         // nested value pass through route parameter
// //   res.send(req.params)                                   // /floor/12/book/physics
// // })


// // app.get('/floor/:number/book/:name',(req,res)=>{         // nested value pass through route parameter
// //   res.send(req.params.name)                                   // /floor/12/book/physics
// // })

// // app.get('/floor/:number/book/:name',(req,res)=>{        
// //   res.send("Book Name : " + req.params.name)                        
// // })


// // app.get('/floor/:number-:name',(req,res)=>{             //  /floor/12-physics  
// //   res.send("Book Name : " + req.params.name)                             
// // })


// // app.get('/floor/:number-:name-:id',(req,res)=>{             //  /floor/12-physics  
// //   res.send( req.params)                             
// // })








//                       req.query



// // app.get('/search',(req,res)=>{            //  /search?name=Hammad 
// //   res.send( req.query)                    // for multiple   /search?name=Hammad&age=19
// // })


// // app.get('/search',(req,res)=>{
// //   const name=req.query.name
// //   const age=req.query.age
// //   res.send(`Your Name is ${name} and age is ${age}.`)
// // })







//                       req.body
//using postman and middelwire


app.post('/about',(req,res)=>{
   res.send(req.body)
})




//                 req.hostname

// app.get('/about',(req,res)=>{
//    res.send(req.hostname)
// })



//                req.ip     req.ips for multiple ips

// app.get('/about',(req,res)=>{
//    res.send(req.ip)
// })



//                req.method

// app.get('/about',(req,res)=>{
//    res.send(req.method)  
// })



//                req.originalUrl

// app.get('/about',(req,res)=>{     
//    res.send(req.originalUrl)          //it returns the full URL of the request route with query string   such as if we use /about?name=Hammad it will return /about?name=Hammad
// })



//                req.path

// app.get('/about',(req,res)=>{
//    res.send(req.path)                //it returns the path of the request route without query string
// })


//                req.protocol

// app.get('/about',(req,res)=>{
//    res.send(req.protocol)            //it returns the protocol of the request route such as http or https
// })


//                req.secure

// app.get('/about',(req,res)=>{
//    res.send(req.secure)             //it returns true if the request is secure (https) otherwise false (http)
// })


//                req.route

// app.get('/about',(req,res)=>{
//    res.send(req.route)              //it returns the route object of the request route
// })



//                req.accepts

// app.get('/about',(req,res)=>{
//   //  res.send(req.accepts('html'))   //it checks if the request accepts html or not
//   //  res.send(req.accepts('json'))  //it checks if the request accepts json or not
//   //  res.send(req.accepts('text'))  //it checks if the request accepts text or not
//   //  res.send(req.accepts('xml'))   //it checks if the request accepts xml or not
//   //  res.send(req.accepts('image')) //it checks if the request accepts image or not
//   //  res.send(req.accepts('application/json')) //it checks if the request accepts application/json or not
//   //  res.send(req.accepts('application/xml')) //it checks if the request accepts application/xml or not
// })

// app.post('/about',(req,res)=>{
//   if(req.accepts('html')) {
//     res.send('<h1>HTML Response</h1>')
//   } else if(req.accepts('json')) {
//     res.send({ message: 'JSON Response' })
//   } else if(req.accepts('text')) {
//     res.send('Text Response')
//   } else if(req.accepts('xml')) {
//     res.send('<message>XML Response</message>')
//   } else if(req.accepts('image')) {
//     res.sendFile('/path/to/image.jpg')
//   } else {
//     res.status(406).send('Not Acceptable')
//   }
// })



//                req.get

// app.get('/about',(req,res)=>{
// res.send(req.get('host'))  //it returns the host of the request
// })

//// same with headers

// app.get('/about',(req,res)=>{
// res.send(req.headers)
// })


// app.get('/about',(req,res)=>{
// res.send(req.headers.host)
// })




//                req.is
//work similar to req.accepts

// app.post('/about',(req,res)=>{
  // res.send(req.is('html'))  //it checks if the request is html or not    
  // res.send(req.is('json'))  //it checks if the request is json or not
  // res.send(req.is('text'))  //it checks if the request is text or not
  // res.send(req.is('xml'))   //it checks if the request is xml or not
  // res.send(req.is('image')) //it checks if the request is image or not
  // res.send(req.is('application/json')) //it checks if the request is application/json or not
  // res.send(req.is('application/xml')) //it checks if the request is application/xml or not
// })


// app.post('/about',(req,res)=>{
//   if(req.is('html')) {
//     res.send('<h1>HTML Response</h1>')
//   } else if(req.is('json')) {
//     res.send({ message: 'JSON Response' })
//   } else if(req.is('text')) {
//     res.send('Text Response')
//   } else if(req.is('xml')) {
//     res.send('<message>XML Response</message>')
//   } else if(req.is('image')) {
//     res.sendFile('/path/to/image.jpg')
//   } else {
//     res.status(406).send('Not Acceptable')
//   }
// })









//           in short accept and is


// app.get('/about', (req, res) => {
//   if (req.accepts('json')) {
//     res.json({ msg: "JSON" });
//   } else if (req.accepts('html')) {
//     res.send("<h1>HTML</h1>");
//   } else {
//     res.status(406).send("Not Acceptable");
//   }
// });
// // Client keh raha hai: "Mujhe JSON ya HTML response chahiye."




// app.post('/about', (req, res) => {
//   if (req.is('json')) {
//     res.send("You sent JSON data");
//   } else if (req.is('html')) {
//     res.send("You sent HTML data");
//   } else {
//     res.status(406).send("Unsupported Content-Type");
//   }
// });
// // Client keh raha hai: "Main JSON data bhej raha hoon."
// // Server check karta hai: kya ye JSON hai? req.is('json')








