const mongoose= require('mongoose');

const contactSchema = new mongoose.Schema({
first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  }
}, { collection: 'contacts' });

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
