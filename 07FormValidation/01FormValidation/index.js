//// npm install express-validator

// const { body, validationResult } = require("express-validator");

//  var validationRegistration = [
// body('username').notEmpty().withMessage('Username is required'),
// body('password'). isLength({ min: 5, max: 10 }).
// withMessage('Password must be between 5 and 10 characters long')
// ]

// app.post('/saveform', validationRegistration, (req, res) =>
// {
// const result = validationResult(req);
// res.send(result);
// });




// Validation Methods

// notEmpty()
// isEmail()
// isLength(options)
// isNumeric()
// isAlpha()
// isAlphanumeric()
// isURL()
// isDate()
// isln()
// isStrong Password()
// isUpperCase()
// isLowerCase()
// matches(pattern)






// Sanitization Methods

// trim()
// Itrim()
// rtrim()
// escape()
// unescape()
// normalize Email()
// tolnt()
// toFloat()
// toBoolean()




// Custom Validation

// custom(validator)
// customSanitizer(sanitizer)












const express = require('express')
const app = express()

const {body,validationResult}=require('express-validator')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))


const validationRegistration=[
    body('username')
    .notEmpty().withMessage('Username is required.')
    .isLength({min:3}).withMessage('Username must be at least 3 characters long.')
    .trim()
    .isAlpha().withMessage("Username must contain only letters.")
    .toLowerCase() 
    .custom(value =>{
        if(value==='admin'){
            throw new Error('Username "admin" not allowed.')
        }
        return true
    })
    ,

    body('useremail')
    .isEmail().withMessage('Email is required.')
    .normalizeEmail(),

    body('userpassword')
    .isLength({min:5 , max:10}).withMessage('Password must be between 5 and 10 characters long.')
    .isStrongPassword().withMessage('Password must include 1 uppercase, 1 lowercase, 1 number, 1 special character and be at least 8 characters long.'),

    body('userage')
    .isNumeric().withMessage('Age must be numeric.')
    .isInt({ min: 18, max: 120 }).withMessage('Age must be a number between 18 and 120'),

    body('usercity')
    .isIn(['Sahiwal','Sargodha','Lahore','Islamabad']).withMessage('City must be Sahiwal, Sargodha, Lahore, Islamabad'),
]




app.get('/',(req,res)=>{
    res.render('myform',{errors:0})
})

app.post('/saveform',validationRegistration,(req,res)=>{
    const error=validationResult(req)
    if(error.isEmpty()){
        res.send(req.body)
    }
    res.render('myform',{errors:error.array()})
})

app.listen('4000',()=>{
    console.log(`Successfully Connected http://localhost:${4000}`)
})

