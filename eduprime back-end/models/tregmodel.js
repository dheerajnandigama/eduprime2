const mongoose = require("mongoose");
const Joi = require("joi");

const RegSchema = new mongoose.Schema({
  cname: { type: String, require: true },
  tname: { type: String, require: true },
  branch: { type: String, require: true },
  phno: { type: Number, require: true },
  email: { type: String, require: true },
  pass: { type: String, require: true },
});

function validateuser(user) {
  const schema = {
    cname: Joi.string().min(1).max(50).required(),
    tname: Joi.string().min(1).max(50).required(),
    branch: Joi.string().min(1).max(50).required(),
    phno: Joi.string().min(3).max(10).required(),
    email: Joi.string().min(4).max(50).required(),
    pass: Joi.string().min(4).max(50).required(),
  };
  return Joi.validate(user, schema);
}

const Taccount = mongoose.model("taccounts", RegSchema);

exports.Taccount = Taccount;

exports.validateuser = validateuser;
