import express from "express"

import {
  getPaymentSummary
} from "../controllers/paymentSummaryController.js"


const router = express.Router()

router.get("/", getPaymentSummary)

export default router