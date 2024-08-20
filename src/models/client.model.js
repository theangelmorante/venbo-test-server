const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const clientSchema = new mongoose.Schema({
  identification: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["PERSON", "COMPANY"],
    required: true,
  },
  isRegular: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  employees: [employeeSchema],
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
