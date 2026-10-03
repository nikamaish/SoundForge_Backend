
const express = require("express");
const authController = require("./auth.controller");
const authValidation = require("./auth.validation");
const validate = require("../../common/middleware/validate");
const authenticate = require("../../common/middleware/authenticate");

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(authValidation.loginSchema),
  authController.login
);

router.post("/logout", authController.logout);

router.get("/me", authenticate, authController.me);

module.exports = router;