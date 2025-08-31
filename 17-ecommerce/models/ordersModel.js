import mongoose from "mongoose"
import dayjs from "dayjs"

import CartItems from "./cartItemsModel.js"
import { BadRequest } from "../errors/index.js"

const { Schema } = mongoose

const productsSchema = new Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Product id is required"]
  },
  quantity: {
    type: Number,
    min: [1, "Quantity should not < 0"],
    required: [true, "Quantity is required"]
  },
  estimatedDeliveryTimeMs: {
    type: Number,
    required: [true, "Estimated Delivery time is required"]
  }
})

const ordersSchema = new Schema({
  orderTimeMs: {
    type: Number,
    default: function() {
      return dayjs().valueOf()
    }
  },
  totalCostCents: {
    type: Number,
    required: [true, "Total cost is required"],
    min: [1, "Total cost should not < 0"]
  },
  products: {
    type: [productsSchema],
    required: [true, "Products array is required"],
    validate: {
      validator: function(val) {
        return val.length === 0 ? false : true
      },
      message: "Products array should not be empty"
    }
  }
})

ordersSchema.pre("validate", async function(next) {
  const cartItems = await CartItems
    .find({})
    .populate("deliveryOption")
    .populate("product")
    .lean()
  
    // console.log(cartItems)

  if(!cartItems || cartItems.length === 0) 
    throw new BadRequest("Cart is empty")

  let totalCostCents = 0
  const array = cartItems.map(item => {
    const { 
      deliveryDays,
      priceCents:deliveryPrice
    } = item.deliveryOption
    
    const { 
      priceCents:productPrice,
    } = item.product

    const estimatedDeliveryTimeMs = dayjs(this.orderTimeMs).
      add(deliveryDays, "day").
      valueOf()

    totalCostCents += (productPrice * item.quantity) + deliveryPrice

    let newItem = {...item}
    delete newItem._id

    return {
      ...newItem,
      estimatedDeliveryTimeMs
    }
  })

  this.totalCostCents = (totalCostCents * 1.1).toFixed(2) // for tax 10% 
  this.products = array
  await CartItems.deleteMany({})
})


export default mongoose.model("Order", ordersSchema)