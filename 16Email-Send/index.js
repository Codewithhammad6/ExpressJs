//                 When we send Email ?
// SignUp confirmation mail
// Forgot password mail
// Send OTP for login
// Sending Newsletter mail
// Update personal data like password mail



// npm install nodemailer

// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
// host: 'smtp.gmail.com',
// port:587,
// secure:false,
// auth:{
//        user: 'youremail@gmail.com',
//        pass: 'yourpassword'
//      }
// })




// const info = transporter.sendMail({
// from: '"Your Name" <youremail@gmail.com> ',
// to: 'reciever@email.com',
// subject: 'This is test email',
// text: 'Here is your message',
// html: '<b>Here is your message</b>'
// })
// res.json({ message: 'Email sent successfully!', info });





const express = require("express");
const app = express();
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs'); 

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')


const transporter =  nodemailer.createTransport({
host:'smtp.gmail.com',
port:587,
secure:false,           //STARTTLS if use secure
auth:{
  user:'hammadp...@gmail.com',
  pass:'xwomuszdbdt'
}
})



//simple text send

// app.post('/send-email',async (req, res) => {
// const {to, subject, text} = req.body
// try {
// const info = await transporter.sendMail({
//   from:'"Hammad Sadiq" <hammadp...@gmail.com>',
//   to:to,
//   subject:subject,
//   text:text,
// })  
// res.json({message:"Email Send Successfully",info})
// } catch (error) {
//   res.status(500).json({message:"Failes to send email",error})
// }})





//text with some file send

// app.post('/send-email',async (req, res) => {
// const {to, subject, text} = req.body
// try {
// const info = await transporter.sendMail({
//   from:'"Hammad Sadiq" <hammadp...@gmail.com>',
//   to:to,
//   subject:subject,
//   text:text,
//   attachments:[
//     {
//       filename:'data.pdf',
//       path:path.join(__dirname,'files','data.pdf')
//     }
//   ]
// })  
// res.json({message:"Email Send Successfully",info})
// } catch (error) {
//   res.status(500).json({message:"Failes to send email",error})
// }})







//html page send with file

// app.post('/send-email',async (req, res) => {
// const {to, subject, text} = req.body
// try {
// const info = await transporter.sendMail({
//   from:'"Hammad Sadiq" <hammadp...@gmail.com>',
//   to:to,
//   subject:subject,
//   html:`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Thank You & Welcome</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f2f2f2;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       height: 100vh;
//       margin: 0;
//       }
//     .message-box {
//       background-color: #ffffff;
//       border: 2px solid #007bff;
//       border-radius: 10px;
//       padding: 40px;
//       text-align: center;
//       box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//     }
//     .message-box h1 {
//       margin: 0;
//       color: #007bff;
//       font-size: 32px;
//     }
//     .message-box p {
//       margin-top: 10px;
//       color: #333;
//       font-size: 20px;
//     }
//   </style>
// </head>
// <body>
//   <div class="message-box">
//     <h1>Thank You</h1>
//     <p>Welcome</p>
//   </div>
// </body>
// </html>
// `,
//   attachments:[
//     {
//       filename:'data.pdf',
//       path:path.join(__dirname,'files','data.pdf')
//     }
//   ]
// })  
// res.json({message:"Email Send Successfully",info})
// } catch (error) {
//   res.status(500).json({message:"Failes to send email",error})
// }})







//best way to send html page

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    const template = await fs.promises.readFile(
      path.join(__dirname, 'views', 'email-template.ejs'),'utf-8');
      
const html = ejs.render(template, { message: text });

    const info = await transporter.sendMail({
      from: '"Hammad Sadiq" <hammadp...@gmail.com>',
      to: to,
      subject: subject,
      html: html,
    });
    res.json({ message: "Email sent successfully", info });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
});









app.get('/', (req, res) => {
res.render('mailpage')
})



app.listen(4000, (req, res) => {
  console.log(`Successfully Connected http://localhost:${4000}`);
});
