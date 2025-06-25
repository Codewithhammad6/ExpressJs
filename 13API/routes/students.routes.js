//Api bana rhay hain api may sara data json() may hi hota ha


const express= require('express');
const router=express.Router()

const Student = require('../models/student.model')




//Get All Students
router.get('/',async (req,res)=>{
try {
    const students=await Student.find();
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
router.post('/',async (req,res)=>{
try {
    const newStudent=await Student.create(req.body)
res.status(201).json(newStudent)

} catch (error) {
    res.status(400).json({message:error.message})
}
})



//Update a Student
router.put('/:id',async (req,res)=>{
try {
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
         return res.status(404).json({message:"Student not found"})
   }
   res.json({message:"Student deleted successfully"})
} catch (error) {
    res.status(500).json({message:error.message})
}
})


module.exports=router;