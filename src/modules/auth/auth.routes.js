const express = require("express");
const authController = require("./auth.controller");
const authValidation = require("./auth.validation");
const validate = require("../../common/middleware/validate");

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.registerSchema),
  authController.register,
);

module.exports = router;
