import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
  {
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
    },
  },
  { collection: "contacts" }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
