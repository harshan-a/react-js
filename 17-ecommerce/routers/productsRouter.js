import express from "express"

import {
  getProducts
} from "../controllers/productsController.js"

const router = express.Router()


router.route("/").
  get(getProducts)

export default router
