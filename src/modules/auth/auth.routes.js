const express = require("express");

const authController = require("./auth.controller");
const authValidation = require("./auth.validation");

const router = express.Router();

router.post("/register", authValidation.registerSchema, authController.register);

module.exports = router;
