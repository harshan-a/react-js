import mongoose from "mongoose"


const { Schema } = mongoose

const cartItemSchema = new Schema({
  product: {
    index: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required"]
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity should not < 0"]
  },
  deliveryOption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryOption",
    required: [true, "Delivery option is required"]
  }
})


export default mongoose.model("Cart", cartItemSchema, "cart-items");