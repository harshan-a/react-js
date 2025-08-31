import mongoose from "mongoose"

const { Schema } = mongoose

const ratingSchema = new Schema({
  _id: false,
  stars: {
    type: Number,
    min: [0, "Rating avg must >= 0"],
    max: [5, "Rating avg must <= 5"],
  },
  count: {
    type: Number,
  }
})

const productsSchema = new Schema({
  image: {
    type: String,
    required: [true, "Image url is required"],
    trim: true,
    validate: {
      validator(value) {
        return /^\/?images\/products\/\w+[-\w]*\w+\.(jpg|png)/.test(value)
      },
      message: (props => props.value + " is not valid image path")
    }
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },
  rating: {
    type: ratingSchema,
    default: () => ({})
  },
  priceCents: {
    type: Number,
    required: [true, "Price cents is required"],
    min: [1, "Price should not < 0"]
  },
  keywords: {
    type: [String],
    set: val => val.map(p => p.trim())
  }
}, { timestamps: true })

productsSchema.index({name: "text", keywords: "text"})


export default mongoose.model("Product", productsSchema)

