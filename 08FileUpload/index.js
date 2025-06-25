// npm install multer

//                               Multer


// Storage                     Limits                     File Filter

// Destination                 fileSize (bytes)           Image(JPG, PNG)
// filename                    files                      PDF
//                             fields                     Excel
//                                                        Word
//                                                        Video          


// 1 KB = 1024 Bytes
// 1 MB = 1024 KB




// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
// destination: function (req, file, cb) {
// cb(null, './uploads')
// },
// filename: function (req, file, cb) {
// const newFileName = Date.now() + path.extname(file.originalname)
// cb(null, newFileName)
// }
// })

// const limits = {
// fileSize: 1024 * 1024 * 5 
// };


// const upload = multer({
//    storage: storage,
//    limits: limits
//    })

// app.post('/submitform', upload.single('imagefile'), (req, res)=> {
//    res.send(req.file)
//    })


// if upload more than one
// // upload.array('imagefile', 5)
// // upload.fields([ { name: 'profilePic', maxCount: 1 }, { name: 'documents', maxCount: 3}]) van










const express = require('express');
const app=express()
const multer = require('multer')
const path = require('path')


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')


const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
cb(null,'./uploads')
  },
  filename:(req,file,cb)=>{
    const newFileName=Date.now() + path.extname(file.originalname)
cb(null,newFileName)
  }
})

//file.mimetype.startsWith('image/')
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'userfile') {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG or PNG images are allowed for userfile'), false);
    }
  } else if (file.fieldname === 'userdocument') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for userdocument'), false);
    }
  } else {
    cb(new Error('Unknown field name'), false);
  }
};


const upload=multer({
  storage:storage,
  limits:{
    fileSize:1024 * 1024 * 3
  },
  fileFilter:fileFilter
})




app.get('/', (req, res) => {
  res.render('myform');
});

app.post('/submitform', upload.fields([
  { name: 'userfile', maxCount: 1 },
  { name: 'userdocument', maxCount: 3 }
]), (req, res) => {
  if (!req.files || (Object.keys(req.files).length === 0)) {
    return res.status(400).send('No files uploaded.');
  }
   res.send(req.files)
   })




app.use((error,req,res,next)=>{
if(error instanceof multer.MulterError){
 return res.status(400).send(`Multer error: ${error.message}`);
}else if(error){
 return res.status(500).send(`Something went wrong: ${error.message}`);
}
next()
})


app.listen(4000, () => {
  console.log(`Server running at http://localhost:${4000}`);
});