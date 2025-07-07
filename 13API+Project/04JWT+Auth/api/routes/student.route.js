const express = require("express");

const router = express.Router();
const Student = require("../model/student.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});



const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
  storage: storage,
  limits: 1024 * 1024 * 3, // 3MB limit
  fileFilter: fileFilter,
});




//get all students
router.get("/", async (req, res) => {
  try {
const search= req.query.search || '';
const query ={
  $or:[
    { first_name: { $regex: search, $options: "i" } },
    { last_name: { $regex: search, $options: "i" } },
  ]
}

    const students = await Student.find(query);
    res.status(200).json(students);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json("Student not found");
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
});

//create a new student
router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {

    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(400).json("Email already exists");
    }

    const student = new Student(req.body);
    if (req.file) {
      student.profile_pic = req.file.filename; 
    }
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error:", error);

    //  Delete uploaded image if error occurs
    if (req.file && req.file.filename) {
      const filePath = path.join('uploads', req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Failed to delete uploaded image:", err);
        }
      });
    }

    res.status(500).send("Internal Server Error");
  }
});



const checkObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Invalid ID format");
  }
  next();
};



//update a student
router.put("/:id",checkObjectId, upload.single("profile_pic"), async (req, res) => {
  try {
    const existingStudent = await Student.findById(req.params.id);
    if (!existingStudent) {
      if (req.file && req.file.filename) {
        const filePath = path.join("uploads", req.file.filename);
fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
    }
}
if(req.file){
    if(existingStudent.profile_pic){
 const oldImage=path.join('uploads', existingStudent.profile_pic);
fs.unlink(oldImage, (err) => {
          if (err) {   
            console.error("Error deleting file:", err);
          }
        });
        req.body.profile_pic = req.file.filename;
}
    }


    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json("Student not found");
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//delete a student
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json("Student not found");
    }
    if (deletedStudent.profile_pic) {
      const filePath = path.join("uploads", deletedStudent.profile_pic);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    }
    res.status(200).json("Student deleted successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;