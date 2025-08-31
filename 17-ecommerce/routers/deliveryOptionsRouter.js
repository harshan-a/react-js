import express from "express"

import {
  getDeliveryOptions
} from "../controllers/deliveryOptionsController.js"

const router = express.Router()

router.get("/", getDeliveryOptions)


export default router
