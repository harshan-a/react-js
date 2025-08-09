const express = require("express");
const router = express.Router();

const {
  login,
  register,
  refreshToken,
} = require("../controllers/authController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/refreshToken").get(refreshToken);

module.exports = router;