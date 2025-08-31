import { StatusCodes } from "http-status-codes"

import Products from "../models/productsModel.js"


export async function getProducts (req, res) {
  const {
    query: {
      search = ""
    }
  } = req

  const queryObject = {}

  if(search.trim()) {
    // queryObject.$text = { $search: "/" + search + "/"}
    queryObject.$or = [
      // { name: { $regex: `[${search}]` } }, 
      { name: { $regex: search, $options: "i" } },
      { keywords: { $elemMatch: { $regex: search, $options: "i" } } }
    ]
  }
  
  const products = await Products.find(queryObject)

  res.
    status(StatusCodes.OK).
    json({
      success: true,
      data: products,
      nbHits: products.length
    })
}