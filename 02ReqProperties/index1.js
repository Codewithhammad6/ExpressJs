// const express = require('express');
// const app = express();


// // Middleware (optional)
// app.use(express.json());

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello, !');
// });

// // Start server
// app.listen(3000, () => {
//   console.log(`Server running on http://localhost:${3000}`);
// });










// const express=require('express')   //tell js use express framework
// const app=express()                //app object lay lia ha jismay express use as a class


// // crud
// //types of request => create , read , update , delete

// app.post('/',(req,res)=>{           //create
// })


// app.get('/',(req,res)=>{            //read
//   res.send("Hello world!")
// })


// app.put('/',(req,res)=>{           //update
// })


// app.delete('/',(req,res)=>{        //delete
// })

// app.listen(3000,()=>{                // start server using post 3000
//   console.log(`Successfully Connected with Server http://localhost:${3000}`)
// })






// //what is route?
// app.get('/about',(req,res)=>{            // '/about' is route
//   res.send("Hello world!")
// })



















// const express=require('express')   
// const app=express()        

// app.listen(3000,()=>{              
//   console.log(`Successfully Connected with Server http://localhost:${3000}`)
// })

// app.get('/',(req,res)=>{ 
//   res.send("<h1>Welcome to Home Page<h1/>")
// })

// app.get('/about',(req,res)=>{ 
//   res.send("About Page")
// })

// app.get('/about/user',(req,res)=>{              // nested route
//   res.send("User Page")
// })

// app.get('/gallery',(req,res)=>{ 
//   res.send("Gallery Page")
// })

// app.get('/random.page',(req,res)=>{ 
//   res.send("Random Page")
// })


// // value pass through route parameter

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


// // app.get('/search',(req,res)=>{            //  /search?name=Hammad 
// //   res.send( req.query)                    // for multiple   /search?name=Hammad&age=19
// // })


// // app.get('/search',(req,res)=>{
// //   const name=req.query.name
// //   const age=req.query.age
// //   res.send(`Your Name is ${name} and age is ${age}.`)
// // })





















//           ExpressJs Response Methods


// res.send()     //Text, HTML, Object, Array, Buffers             
// res.json()
// res.jsonp()
// res.redirect()
// res.render()
// res.download()
// res.sendFile()
// res.end()
// res.sendStatus()
// res.headersSent()
// res.set()
// res.get()







const express=require('express')   
const app=express()        

app.listen(4000,()=>{              
  console.log(`Successfully Connected with Server http://localhost:${4000}`)
})

app.get('/',(req,res)=>{ 
  res.send("<h1>Welcome Home Page</h1>")
})

// app.get('/',(req,res)=>{ 
//   res.send([1,2,3,4,{Name:"hammad",age:19}])
// })


// app.get('/',(req,res)=>{ 
//   res.send({name:"Hammad",age:19})
// })


/* same hum json say kr saktay hain pr best ha kay object ko json
 may retrun kray asay hi jsonp bhi same json ya send ki tarha ha pr
 wo waha use hota ha jaha multiple request a rhi ha or unhay json return 
 krna ha phir jsonp use krtay hain pr ya secure nhi ha is liay json use hota ha
*/

// app.get('/',(req,res)=>{ 
//   res.json({name:"Hammad",age:19})
// })


// app.get('/',(req,res)=>{ 
//   const user=[
//     {name:"hammad",id:1},
//     {name:"sadiq",id:2}
//   ]
//   res.json(user)
// })








//                        res.redirect()


// app.get('/about',(req,res)=>{ 
//   res.redirect('/user')
// })
// app.get('/user',(req,res)=>{              // nested route
//   res.send("User Page")
// })



// app.get('/about',(req,res)=>{ 
//   res.redirect('https://www.google.com')
// })



/*
ya codes redirect kay sath likhtay hay search engines ko batanay kay liay kay ya redirection kasi ha permanent ya temporary
workink pr koi effect nhi hota agar na bhi likho

301  A permanent redirect used when a resource has been moved to a new URL.
302  A temporary redirect used when a resource has been temporarily moved to a new URL.
303  A temporary redirect used after a POST or PUT operation.
307  A temporary redirect similar to 302, but better for sites with non-GET operations.
308  The permanent counterpart to the 307 redirect.
*/



// app.get('/about',(req,res)=>{ 
//   res.redirect(301,'https://www.google.com')
// })



// Agar back ya previous page pr jana ho

// app.get('/about',(req,res)=>{ 
//   res.redirect('..')
// })











//                      res.render()
//agar html show krwni ho .send use ho jata ha pr agar pura page html show krni ho phir render use hoga


// app.set('view engine','ejs')      //essential for render ejs template engine ha html show krwata ha


// app.get('/user',(req,res)=>{             //view kay andar html ka page .ejs kay sath bana zaroori ha
//  res.render('user');
// })









//                          res.download()



// app.get('/download',(req,res)=>{             //view kay andar html ka page .ejs kay sath bana zaroori ha
// res.download('./files/book.pdf');
// })

// app.get('/download',(req,res)=>{             //agar pdf name change krna ho
// res.download('./files/book.pdf','Hammad.pdf');
// })






// app.get('/user',(req,res)=>{
//   res.render('user')
// })

// app.get('/download',(req,res)=>{ 
//   res.download('./files/book.pdf')
// })







//                   res.sendFile()
//it open that video pdf img etc in tab


// app.get('/download',(req,res)=>{ 
//   res.sendFile(__dirname +'/files/book.pdf')
// })





//                      res.end()

// app.get('/end',(req,res)=>{
//   res.write('This is testing')
//   res.end()
// })







//                     res.sendStatus()

// app.get('/error',(req,res)=>{
//   res.sendStatus(404)
// })

// app.get('/error',(req,res)=>{
//   res.sendStatus(200)
// })

// app.get('/error',(req,res)=>{
//   res.status(200).send("Hello Buddy")
// })

/*
200 - OK
201 Created
403 Forbidden  no permision
404 Not Found
500-Internal Server Error
503 - Service Unavailable
504 - Gateway Timeout
*/






//                res.headersSent()
//check in terminal  check krta res send hua ya nhi


// app.get('/check',(req,res)=>{
// console.log(res.headersSent)
// res.send("Hello Buddy")
// console.log(res.headersSent)
// })






//           res.set()         res.get() 

// app.get('/check',(req,res)=>{
// res.set('custom-header', 'hello123')
// console.log(res.get('custom-header'));
// res.send("Header Set")
// })









