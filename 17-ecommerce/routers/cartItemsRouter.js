import express from "express"

import {
  updateCartItem,
  getCartItems,
  deleteCartItem,
  createCartItem
} from "../controllers/cartItemsController.js"


const router = express.Router()

router.route("/:productId").
  patch(updateCartItem).
  delete(deleteCartItem)

router.route("/").
  get(getCartItems).
  post(createCartItem)

export default router