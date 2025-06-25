import express from "express"
const app=express();

import { ConnectDB } from "./config/database.js";
import router from "./routes/contact.route.js";


app.listen(4000,()=>{
    console.log(`Successfully Connected http://localhost:${4000}`);
});



ConnectDB();



// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
app.use("/",router)


