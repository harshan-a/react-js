import DeliveryOptions from "../models/deliveryOptionsModel.js"
import dayjs from "dayjs"

export async function getDeliveryOptions (req, res) {
  const {
    query: {
      estimatedDeliveryTime
    }
  } = req
  
  let deliveryOptions = await DeliveryOptions
    .find({})
    .lean()

  if(estimatedDeliveryTime) {
    deliveryOptions = deliveryOptions
      .map(deliveryOption => {
        const estimatedDeliveryTimeMs = dayjs()
          .add(deliveryOption.deliveryDays, "day")
          .valueOf()

        return {
          ...deliveryOption,
          estimatedDeliveryTimeMs
        }
      })
  }

  
  res
    .status(200)
    .json({
      success: true, 
      data: deliveryOptions,
      nbHits: deliveryOptions.length
    })
}