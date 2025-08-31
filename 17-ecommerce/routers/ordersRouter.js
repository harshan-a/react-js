import express from "express"

import {
  getOrders,
  createOrder,
  getOrder
} from "../controllers/ordersController.js"

const router = express.Router()

router.route("/").
  get(getOrders).
  post(createOrder)

router.route("/:orderId")
  .get(getOrder)


export default router