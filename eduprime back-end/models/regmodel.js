const mongoose = require("mongoose");
const Joi = require("joi");

const RegSchema = new mongoose.Schema({
  sname: { type: String, require: true },
  phno: { type: Number, require: true },
  branch: { type: String, require: true },
  rollno: { type: String, require: true },
  email: { type: String, require: true },
  pass: { type: String, require: true },
});

function validateuser(user) {
  const schema = {
    sname: Joi.string().min(3).max(50).required(),
    phno: Joi.string().min(3).max(10).required(),
    branch: Joi.string().min(1).max(50).required(),
    rollno: Joi.string().min(4).max(100).required(),
    email: Joi.string().min(5).max(50).required(),
    pass: Joi.string().min(4).max(50).required(),
  };
  return Joi.validate(user, schema);
}

const Account = mongoose.model("saccounts", RegSchema);

exports.Account = Account;
exports.validateuser = validateuser;
