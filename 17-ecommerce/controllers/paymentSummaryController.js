import { StatusCodes } from "http-status-codes"

import CartItems from "../models/cartItemsModel.js"

export async function getPaymentSummary (req, res) {
  const cartItems = await CartItems
    .find({})
    .populate("deliveryOption")
    .populate('product')
    .lean()

    // console.log(cartItems)
  let totalItems = 0
  let productCostCents = 0
  let shippingCostCents = 0
  cartItems.forEach(item => {
    totalItems += item.quantity
    productCostCents += item.product.priceCents * item.quantity
    shippingCostCents += item.deliveryOption.priceCents
  })
  const totalCostBeforeTaxCents = productCostCents + shippingCostCents
  const taxCents = totalCostBeforeTaxCents * 0.10
  const totalCostCents = totalCostBeforeTaxCents + taxCents

  const paymentSummary = {
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents,
  }
  
  res
    .status(StatusCodes.OK)
    .json({
      success: true, 
      data: paymentSummary
    })
}