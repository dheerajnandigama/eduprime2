const { Taccount, validateuser } = require("../models/tregmodel");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const addtuser = async (req, res) => {
  //   const { error } = validateusert(req.body);
  //   if (error) {
  //     return res.status(400).send(error.details[0].message);
  //   }
  let account = await Taccount.findOne({ email: req.body.email });
  if (account) return res.status(459).send("email already registred");

  let acc = {
    cname: req.body.cname,
    tname: req.body.tname,
    branch: req.body.branch,
    phno: req.body.phno,
    email: req.body.email,
    pass: req.body.pass,
  };
  account = new Taccount(
    _.pick(acc, ["cname", "tname", "phno", "branch", "email", "pass"])
  );
  await account
    .save()
    .then((result) => {
      const token = jwt.sign(
        { _id: account._id, tname: account.tname, mail: account.email },
        "jwtkey"
      );

      res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(_.pick(account, ["_id", "tname", "email"]));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: "Error while creating your account",
      });
    });
};

module.exports = {
  addtuser,
};
