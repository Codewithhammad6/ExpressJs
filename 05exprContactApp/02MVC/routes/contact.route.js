
import  express  from 'express';
import Contact from '../models/contacts.models.js'
const router=express.Router()

// Routes

router.get('/', async (req,res)=>{
const contacts=await Contact.find()
    res.render('home',{contacts})
});

router.get('/show-contact/:id',async (req,res)=>{
const contact=await Contact.findOne({_id:req.params.id});
    res.render('show-contact',{contact})
});

router.get('/add-contact',(req,res)=>{res.render('add-contact')});

router.post('/add-contact',async (req,res)=>{
    await Contact.create(req.body)
    res.redirect('/');
});






router.get('/update-contact/:id',async (req,res)=>{
const contact = await Contact.findOne({_id:req.params.id});
    res.render('update-contact',{contact});
});

router.post('/update-contact/:id', async (req,res)=>{

   await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
   res.redirect('/');
});

 



router.get('/delete-contact/:id',(req,res)=>{
    Contact.findByIdAndDelete(req.params.id).then(()=>{
        res.redirect('/');
    }).catch((err)=>{
        console.log('Error deleting contact:', err);
        res.status(500).send('Internal Server Error');
    });
});

export default router