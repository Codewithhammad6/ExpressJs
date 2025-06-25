const express=require('express');
const app=express();

//mongoose
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contact-crud').then(()=>{
    console.log('Successfully Connected to MongoDB');
}).catch((err)=>{
    console.log('Error connecting to MongoDB:', err);
});

const Contact=require('./models/contacts.models');

app.listen(4000,()=>{
    console.log(`Successfully Connected http://localhost:${4000}`);
});







// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');


// Routes

app.get('/', async (req,res)=>{
const contacts=await Contact.find()
    res.render('home',{contacts})
});

app.get('/show-contact/:id',async (req,res)=>{
const contact=await Contact.findOne({_id:req.params.id});
    res.render('show-contact',{contact})
});

app.get('/add-contact',(req,res)=>{res.render('add-contact')});

app.post('/add-contact',async (req,res)=>{
    await Contact.create(req.body)
    // const contact=await Contact.insertOne({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,  
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     address: req.body.address
    // })
    res.redirect('/');
});






app.get('/update-contact/:id',async (req,res)=>{
const contact = await Contact.findOne({_id:req.params.id});
    res.render('update-contact',{contact});
});

app.post('/update-contact/:id', async (req,res)=>{

   await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
   res.redirect('/');
});

 



app.get('/delete-contact/:id',(req,res)=>{
    Contact.findByIdAndDelete(req.params.id).then(()=>{
        res.redirect('/');
    }).catch((err)=>{
        console.log('Error deleting contact:', err);
        res.status(500).send('Internal Server Error');
    });
});


