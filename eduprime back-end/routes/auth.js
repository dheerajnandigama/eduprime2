const express = require("express");
const addsuser = require("../controllers/reg");
const addtuser = require("../controllers/treg");
const Login = require("../controllers/auth");

const router = express.Router();

router.post("/sreg", addsuser.addsuser);
router.post("/treg", addtuser.addtuser);
router.post("/login", Login.authuser);

module.exports = router;
