import mongoose from "mongoose"
// import dayjs from "dayjs"

const { Schema } = mongoose

const deliveryOptionsSchema = new Schema({
  deliveryDays: {
    type: Number,
    required: [true, "Delivery days is required"],
    enum: {
      values: [1, 3, 7],
      message: "Invalid delivery days"
    }
  },
  priceCents: {
    type: Number,
    required: [true, "Delivey price is required"],
    min: [0, "Price should not < 0"]
  }
})

/*
deliveryOptionsSchema
  .methods
  .calculateEstimatedDeliveryTimeMs = function() {
  const estimatedDeliveryTimeMs = dayjs()
    .add(this.deliveryDays, "day").valueOf()

  return {
    ...this,
    estimatedDeliveryTimeMs
  }
}
*/


export default mongoose.model("DeliveryOption", deliveryOptionsSchema)