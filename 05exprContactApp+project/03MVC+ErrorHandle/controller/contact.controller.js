import mongoose from "mongoose";
import Contact from "../models/contact.schema.js";

export const getContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.render("home", { contact });
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const getContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" });
  }

  try {
    const contact = await Contact.findOne({ _id: req.params.id });
    if (!contact) return res.render("404", { message: "Contact not found." });
    res.render("show-contact", { contact });
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const addContactPage = (req, res) => {
  res.render("add-contact");
};

export const addContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const updateContactPage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" });
  }
  try {
    const contact = await Contact.findOne({ _id: req.params.id });
    if (!contact) return res.render("404", { message: "Contact not found." });
    res.render("update-contact", { contact });
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const updateContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" });
  }
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);
    if (!contact) return res.render("404", { message: "Contact not found." });
    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.render("404", { message: "Invalid Id" });
  }

  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.render("404", { message: "Contact not found." });
    return res.redirect("/");
  } catch (error) {
    res.render("500", { message: error });
  }
};
