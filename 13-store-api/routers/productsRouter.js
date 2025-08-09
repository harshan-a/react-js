const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsStatic,
  createProduct,
} = require("../controllers/productsController");


router.route("/")
  .get(getAllProducts)
  .post(createProduct);

router.route("/static")
  .get(getAllProductsStatic);

module.exports = router;