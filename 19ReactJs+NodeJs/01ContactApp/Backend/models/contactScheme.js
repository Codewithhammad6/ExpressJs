const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true ,unique:true},
  phone: { type: String, required: true },
  address: { type: String, required: true },
  profile_pic:{ type: String, required: true }
});

const Contact = mongoose.model("Contacts", contactSchema);
module.exports = Contact;
