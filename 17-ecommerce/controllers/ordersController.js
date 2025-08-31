import { StatusCodes } from "http-status-codes"

import Orders from "../models/ordersModel.js"
import { NotFoundError } from "../errors/index.js"

export async function createOrder (req, res) {
  const order = await Orders.create({})

  res.
    status(StatusCodes.OK).
    json({
      success: true,
      data: order,
      msg: "Order Placed."
    })
}

export async function getOrders (req, res) {
  const {
    query: {
      expand
    }
  } = req

  let result = Orders
    .find({})
    .sort("-orderTimeMs")

  if(expand && expand.trim()) {
    const strings = expand.split(",")
    strings.forEach(string => {
      if(string === "product") {
        result.populate("products.product")
      }
    })
  }

  const orders = await result

  res.
    status(StatusCodes.OK).
    json({
      success: true,
      data: orders,
      nbHits: orders.length
    })
}


export async function getOrder (req, res) {
  const {
    params: {
      orderId
    },
    query: {
      expand
    }
  } = req

  let result = Orders.findOne({_id: orderId})

  if(expand && expand.trim()) {
    if(expand === "product") {
      result = result.populate("products.product")
    }
  }

  const order = await result

  if(!order) {
    throw new NotFoundError("Order not found")
  }

  res 
    .status(StatusCodes.OK)
    .json({
      success: true,
      data: order
    })
}