//                    When we send SMS ?
// Login Alert
// Send OTP for login
// Payment Confirmation
// Order Confirmation
// Shipping & Delivery Updates
// Appointment Reminders
// Subscription Renewals
// Event Reminders
// Promotional Offers
// Welcome Messages



//// npm install twilio
// const twilio = require('twilio');

// const accountSid = 1122334455;
// const authToken = j5k34k3kcvk8v7c7;
// const client = new twilio (accountSid, authToken);

// client.messages.create({
// body: 'Hello from Hammad',
// from: +9112345678,
// to: +91987654321
// })









const express = require('express');
const dotenv = require('dotenv');
const app = express();
const twilio = require('twilio')

dotenv.config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


const accountSid=process.env.TWILIO_ACCOUNT_SID
const authToken=process.env.TWILIO_AUTH_TOKEN
const client = new twilio(accountSid,authToken)

// app.post('/send-sms', async (req, res) => {
//   const { to, message } = req.body;
//   try {
//     const result = await client.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: to
//     });

//     res.status(200).json({
//       sid: result.sid,
//       message: 'SMS sent successfully.'
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Failed to send SMS.',
//       error: error.message
//     });
//   }
// });







app.post('/make-call', async (req, res) => {


  try {
    const call = await client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml', // This is a test XML file from Twilio
      to: +923298099309,  
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    res.status(200).json({
      sid: call.sid,
      message: 'Call initiated successfully.',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to make the call.',
      error: error.message,
    });
  }
});










app.get('/', (req, res) => {
res.render('smspage');
});

app.listen(5000, () => {
console.log(`Successfully Connectes http://localhost:${5000}`)
});