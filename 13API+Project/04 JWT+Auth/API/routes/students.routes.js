//Api bana rhay hain api may sara data json() may hi hota ha


const express= require('express');
const router=express.Router()
const mongoose = require('mongoose');
const multer=require('multer');
const path=require('path');
const fs=require('fs')

const Student = require('../models/student.model')





//upload image
//Multer Config
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        const newFilename=Date.now()+path.extname(file.originalname)
        cb(null,newFilename)
    }
})


// File Filter to allow only images
const filefilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);  // accept the file
    } else {
        cb(new Error('Only images are allowed'), false);  // reject the file
    }
};



const upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*3},  //3MB
    fileFilter:filefilter
});







//search students by name
//Get All Students
router.get('/',async (req,res)=>{
try {
    const search = req.query.search || '';
const query ={
    $or:[
        {first_name:{$regex:search, $options:'i'}}, //i for case insensitive
        {last_name:{$regex:search, $options:'i'}},
    ]
}

    const students=await Student.find(query);
    res.json(students)

} catch (error) {
    res.status(500).json({message:error.message})
}
})







//Get Single Student
router.get('/:id',async (req,res)=>{
try {
     const student=await Student.findById(req.params.id);
   if(!student){
       res.status(404).json({message:"Student not found"})
   }
     res.json(student)
} catch (error) {
    res.status(500).json({message:error.message})
}
})


//Add New Student
router.post('/',upload.single('profile_pic') ,async (req,res)=>{
try {
    // const newStudent=await Student.create(req.body)
    const student=new Student(req.body)
    if(req.file){
        student.profile_pic=req.file.filename; //"req.body mein file ka data nahi jata, wo khud daalna hota hai." agar file hui to wo save ho jay gi
    }
    const newStudent=await student.save();
    res.status(201).json(newStudent)

} catch (error) {
    res.status(400).json({message:error.message})
}
})




const validateMongoId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: ' Invalid student ID format' });
  }
  next();
};



//Update a Student
router.put('/:id',validateMongoId,upload.single('profile_pic') ,async (req,res)=>{
try {

const existingStudent=await Student.findById(req.params.id)

 if(!existingStudent){
    if(req.file && req.file.filename){ //if file is uploaded but student not found
    const filepath=path.join('./uploads', req.file.filename)
fs.unlink(filepath,(err)=> console.log(`Failed to Delete image: ${err}`))
return res.status(404).json({message:"Student not found"})
 }
 }
   if(req.file){
    if(existingStudent.profile_pic){
const oldimagePath=path.join('./uploads', existingStudent.profile_pic)
fs.unlink(oldimagePath,(err)=> console.log(`Failed to Delete old image: ${err}`))
    }
    req.body.profile_pic=req.file.filename
}

    const UpdateStudent=await Student.findByIdAndUpdate(req.params.id, req.body, {new:true});
   if(!UpdateStudent){
       return res.status(404).json({message:"Student not found"})
   }
   res.json(UpdateStudent)

} catch (error) {
    res.status(400).json({message:error.message})
}
})


//Delete a Student
router.delete('/:id',async (req,res)=>{
try {
    const deleteStudent=await Student.findByIdAndDelete(req.params.id);
if(!deleteStudent){
 return res.status(404).json({message:"Student not found"})}

//jab apnay data ko database say delete krtay hain to uski img ya file ko asay remove krtay hain

if(deleteStudent.profile_pic){  //delete img with student data
const filePath=path.join('./uploads', deleteStudent.profile_pic)
fs.unlink(filePath,(err)=>{      //unlink delete file
if(err) console.log(`Failed to Delete: ${err}`);  
})}
res.json({message:"Student deleted successfully"})


} catch (error) {
    res.status(500).json({message:error.message})
}})


module.exports=router;