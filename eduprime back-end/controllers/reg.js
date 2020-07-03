const { Account, validateuser } = require("../models/regmodel");

const jwt = require("jsonwebtoken");
const _ = require("lodash");

const addsuser = async (req, res) => {
  const { error } = validateuser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let account = await Account.findOne({ email: req.body.email });
  if (account) return res.status(459).send("email already registred");
  //   let account1 = await Account.findOne({ rationno: req.body.rationno });
  //   if (account1) return res.status(409).send("ration no  already registred");

  let acc = {
    sname: req.body.sname,
    phno: req.body.phno,
    branch: req.body.branch,
    rollno: req.body.rollno,
    email: req.body.email,
    pass: req.body.pass,
  };
  account = new Account(
    _.pick(acc, ["sname", "phno", "branch", "rollno", "email", "pass"])
  );
  await account
    .save()
    .then((result) => {
      const token = jwt.sign(
        { _id: account._id, sname: account.sname, mail: account.email },
        "jwtkey"
      );

      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(_.pick(account, ["_id", "sname", "email"]));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: "Error while creating your account",
      });
    });
};

module.exports = {
  addsuser,
};
