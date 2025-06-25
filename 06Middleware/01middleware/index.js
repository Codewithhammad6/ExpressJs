//               APPLICATION LEVEL MIDDLEWARE



// const express = require('express')
// const app = express()

// //Middelware

// // app.use((req,res,next)=>{                         // is say uper agar koi route hua uspr ya kam nhi kray ga 
// //     let time=new Date().toLocaleTimeString()     //jis time kisi bhi page ko open kray ga uska time print ho jay ga
// //     console.log(`Time: ${time}`);
// //     console.log(`${req.method} ${req.url}`);     // jis bhi route ya page ko open kray gay uska method or url a jay ga
// //     next()                                       //phly middleware run hoga phir next jis route ya page ko open krna hoga wo open ho jay ga
// // })



// // same as above

// const mymiddleware=((req,res,next)=>{
//     let time=new Date().toLocaleTimeString()     //jis time kisi bhi page ko open kray ga uska time print ho jay ga
//     console.log(`Time: ${time}`);
//     console.log(`${req.method} ${req.url}`);     // jis bhi route ya page ko open kray gay uska method or url a jay ga
//     next()                                       //phly middleware run hoga phir next jis route ya page ko open krna hoga wo open ho jay ga
// })
// app.use(mymiddleware)



// app.get('/',(req,res)=>{
//     res.send("Home Page")
// })

// app.get('/about',(req,res)=>{
//     res.send("About Page")
// })

// app.listen('4000',()=>{
//     console.log(`Successfully Connected http://localhost:${4000}`)
// })






















// const express = require('express')
// const app = express()

// //Middelware
// const mymiddleware=((req,res,next)=>{
//     let time=new Date().toLocaleTimeString()     
//     console.log(`Time: ${time}`);
//     console.log(`${req.method} ${req.url}`);    
//     next()                                     
// })
// // app.use(mymiddleware)


// //agar only /home pr middleware lagana hoga 
// app.get('/',mymiddleware,(req,res)=>{
//     res.send("Home Page")
// })

// app.get('/about',(req,res)=>{
//     res.send("About Page")
// })

// app.listen('4000',()=>{
//     console.log(`Successfully Connected http://localhost:${4000}`)
// })













// const express = require('express')
// const app = express()

// //Middelware
// const mymiddleware=((req,res,next)=>{
//     let time=new Date().toLocaleTimeString()     
//     console.log(`Time: ${time}`);
//     console.log(`${req.method} ${req.url}`);    
//     next()                                     
// })
 
// const myOthermiddleware=((req,res,next)=>{
//     console.log(`Second Middleware`);    
//     next()                                     
// })

// app.get('/',mymiddleware,(req,res)=>{
//     res.send("Home Page")
// })

// app.get('/about',myOthermiddleware,(req,res)=>{
//     res.send("About Page")
// })
// app.get('/contact',mymiddleware,myOthermiddleware,(req,res)=>{
//     res.send("Contact Page")
// })

// app.listen('4000',()=>{
//     console.log(`Successfully Connected http://localhost:${4000}`)
// })


















// //                   ROUTE LEVEL MIDDLEWARE



// const express = require('express')
// const app = express()
// const router=express.Router()



// //Middelware

// router.use((req,res,next)=>{                //ya auto run nhi hoga
//     console.log(`Router-Level Middleware`);
//     next()
// })


// router.get('/',(req,res)=>{
//     res.send("Home Page")
// })

// router.get('/about',(req,res)=>{
//     res.send("About Page")
// })


// // app.use('/',router)            //agar router use krna ha instead of app phir ya middleware must use hoga
// app.use('/test',router)           // ya mid ha agar kisi bhi route ko excess krna ha ya ussay phly ay ga http://localhost:4000/test

// app.listen('4000',()=>{
//     console.log(`Successfully Connected http://localhost:${4000}`)
// })















//               ERROR-HANDLING LEVEL MIDDLEWARE



// const express = require('express')
// const app = express()


// app.get('/',(req,res)=>{
//     res.send("Home Page")
// })

// app.get('/about',(req,res)=>{
//     res.send("About Page")
// })

// // app.get('/',(req,res)=>{      //agar kisi route may galti hogai user ko error show nhi krwana text dikha day gay
// //     res.sen("Home Page")      //send ki jagha sen likha to error a jay ga or middleware kam kray gi
// // })



// //agar user nay asa route search kia jo habhi nhi phir ya show ho jay ga
// app.use((req,res)=>{
//     res.send("Error 404 : Page not found.")
// })


// //jo error base middleware hotay ha uska code routes kay nichay hota ha
// app.use((err,req,res,next)=>{
//     console.error(err.stack)
//     res.status(500).send("Something Broke!")
//     next()
// })


// app.listen('4000',()=>{
//     console.log(`Successfully Connected http://localhost:${4000}`)
// })















//                  BUILT-IN MIDDLEWARE

//express.json();         //agar user say data json may lana or json may hi show krna ho to ya use hoga
//express.urlencoded()    //agar form say data lana ho
//express.static()        //agar css,music,pic etc show krni ha





//                  THIRD-PARTY MIDDLEWARE

// https://expressjs.com/en/resources/middleware.html
