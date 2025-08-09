const express = require("express");
const router = express.Router();

const {
  login, 
  register,
  refreshToken,
  logout,
} = require("../controllers/authController.js");


// router.post("/login", login);
// router.get("/dashboard", dashboard);

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/refresh-token").get(refreshToken);
router.route("/logout").delete(logout);

module.exports = router;