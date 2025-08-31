import { StatusCodes } from "http-status-codes"

import CartItems from "../models/cartItemsModel.js"
import DeliveryOptions from "../models/deliveryOptionsModel.js"
import {
  NotFoundError
} from "../errors/index.js"


export async function createCartItem(req, res) {

  const {
    body: { 
      productId:product,
      quantity
    }
  } = req

  let cartItem = await CartItems.findOne({product})

  if(!cartItem) {
    const deliveryOption = await DeliveryOptions.findOne({})
    cartItem = await CartItems.create({
      quantity,
      product,
      deliveryOption: deliveryOption._id
    })

  } else {
    cartItem.quantity += Number(quantity)
    await cartItem.save()
  }

  res
    .status(StatusCodes.CREATED)
    .json({success: true, msg: "Cart Created.", data: cartItem})

}

export async function updateCartItem(req, res) {
  const {
    params: {
      productId
    },
    query: {
      expand,
    },
  } = req

  // let result = CartItems.
  //   findOne({
  //     product: productId
  //   })

  // if (expand && expand.trim()) {
  //   const strings = expand.split(",")

  //   strings.forEach(string => {
  //     result = result.populate(string)
  //   })
  // }

  // let cartItem = await result;

  // if (!cartItem) {

  //   const deliveryOption = await DeliveryOptions.findOne({})
  //   cartItem = await CartItems.create({
  //     ...req.body,
  //     product: productId,
  //     deliveryOption: deliveryOption._id
  //   })

  // } else {
  //   cartItem.set({ ...req.body })
  //   // await cartItem.validate();
  //   await cartItem.save()
  // }
  let result = CartItems
    .findOneAndUpdate(
      {
        product: productId
      }, 
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
        // Validation will not work if upsert in any cause
      }
    )

  if (expand && expand.trim()) {
    const strings = expand.split(",")

    strings.forEach(string => {
      result = result.populate(string)
    })
  }

  const cartItem = await result

  if(!cartItem) {
    throw new NotFoundError("Cart item is not found to update")
  }

  res.
    status(StatusCodes.OK).
    json({
      success: true,
      data: cartItem,
      msg: "Cart Updated."
    })
}

export async function getCartItems(req, res) {
  // console.log(await CartItems.findOne().lean())
  const {
    query: {
      expand,
    }
  } = req

  let result = CartItems.find({})

  if (expand && expand.trim()) {
    const strings = expand.split(",").map(s => s.trim())
    result = result.populate(strings)

    // strings.forEach(string => {
    //   result = result.populate(string)
    // })
  }

  let cartItems = await result

  res.
    status(StatusCodes.OK).
    json({
      success: true,
      data: cartItems,
      nbHits: cartItems.length,
    })
}

export async function deleteCartItem(req, res) {
  const {
    params: {
      productId
    }
  } = req

  const cartItem = await CartItems
    .findOneAndDelete({
      product: productId
    })

  if (!cartItem) {
    throw new NotFoundError("Cart item is not found to delete")
  }

  res.
    status(StatusCodes.OK).
    json({
      success: true,
      data: cartItem,
      msg: "Cart item deleted."
    })
}