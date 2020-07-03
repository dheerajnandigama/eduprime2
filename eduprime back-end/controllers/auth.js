const { Account } = require("../models/regmodel");
const { Taccount } = require("../models/tregmodel");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const authuser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  if (req.body.ism === 1) {
    let account = await Taccount.findOne({ email: req.body.email });
    if (!account)
      return res.status(402).send("Invalid email or password email not exist");
    const validatepass = (await req.body.password) === account.pass;

    if (!validatepass) {
      return res.status(402).send("Invalid email or password wrong");
    }

    const token = jwt.sign(
      { _id: account._id, tname: account.tname },
      "jwtkey"
    );
    res.send(token);
  } else {
    let account = await Account.findOne({ email: req.body.email });
    // res.send(account);
    if (!account)
      return res.status(402).send("Invalid email or password email not exist");
    const validatepass = (await req.body.password) === account.pass;

    if (!validatepass) {
      return res.status(402).send("Invalid email or password");
    }

    const token = jwt.sign(
      { _id: account._id, sname: account.sname },
      "jwtkey"
    );
    res.send(token);
  }

  //   Console.log(req.body.pass, account.pass);
};

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(4).max(50).required(),
    ism: Joi.number(),
  };
  return Joi.validate(req, schema);
}
module.exports = { authuser };
