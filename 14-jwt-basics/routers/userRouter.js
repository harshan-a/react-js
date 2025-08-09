const express = require("express");
const router = express.Router();

const { dashboard, deleteAllUsers } = require("../controllers/dashboardController");

router.route("/").delete(deleteAllUsers);
router.route("/dashboard").get(dashboard);

module.exports = router;