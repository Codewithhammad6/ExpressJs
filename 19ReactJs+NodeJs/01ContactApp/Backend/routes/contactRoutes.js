const express= require('express')
const router = express.Router()
const Contact = require('../models/contactScheme')
const fs = require('fs')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/')
  },
  filename:function(req,file,cb){
   const newFilename=Date.now()+path.extname(file.originalname)
    cb(null,newFilename)
  }
})

// File Filter to allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false); 
    }
};


const uploads = multer({
  storage:storage,
  limits:{fileSize:1024*1024*3},
  fileFilter:fileFilter
})






//Get all contact
router.get('/',async (req,res)=>{
    try {
        const contact = await Contact.find()
        res.json(contact)
    } catch (error) {
    res.status(500).json({message:error.message})
    }
})



// Get single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({ message: "Contact Not Found." })
    }
    res.json(contact)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// Add contact
router.post("/", uploads.single("profile_pic"), async (req, res) => {
  try {
    const { email } = req.body;
    const existEmail = await Contact.findOne({ email });

    if (existEmail) {
      if (req.file && req.file.filename) {
        const filePath = path.join("uploads", req.file.filename);
        fs.unlink(filePath, (err) => {
          if (err) console.log("Failed to delete uploaded image:", err);
        });
      }
      return res.status(400).json({ message: "Email already exists." });
    }

    const contact = new Contact(req.body);
    if (req.file) {
      contact.profile_pic = req.file.filename;
    }
    const newContact = await contact.save();
    res.status(201).json(newContact);

  } catch (error) {
    if (req.file && req.file.filename) {
      const filePath = path.join("uploads", req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.log("Failed to delete uploaded image:", err);
      });
    }

    res.status(500).json({ message: error.message });
  }
});



//update
router.put('/:id', uploads.single('profile_pic'), async (req, res) => {
  try {
    const existingContact = await Contact.findById(req.params.id);
    if (!existingContact) {
      // Delete the new uploaded file if contact doesn't exist
      if (req.file && req.file.fieldname) {
        const filePath = path.join('./uploads', req.file.filename);
        fs.unlink(filePath, (err) =>
          console.log(`Failed to delete uploaded image: ${err}`)
        );
      }
      return res.status(404).json({ message: "Contact not found" });
    }

    // Prepare updated data
    const updatedData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    };

    if (req.file) {
      // Delete the old image if it exists
      if (existingContact.profile_pic) {
        const oldImagePath = path.join('./uploads', existingContact.profile_pic);
        fs.unlink(oldImagePath, (err) =>
          console.log(`Failed to delete old image: ${err}`)
        );
      }

      updatedData.profile_pic = req.file.filename;
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
      return res.status(404).json({ message: "Contact Not Found." })}
      
      if(contact.profile_pic){ 
        const filePath=path.join('./uploads', contact.profile_pic)
        fs.unlink(filePath,(err)=>{    
          if(err) console.log(`Failed to Delete: ${err}`);  
        })}
        res.json({ message: "Contact deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router