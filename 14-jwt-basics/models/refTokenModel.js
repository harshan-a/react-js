const mongoose = require("mongoose");
const { Schema } = mongoose;

const jwt = require("jsonwebtoken");

const refTokenSchema = new Schema ({
  token: {
    type: [String], 
    required: [true, "Please, provide refresh token"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Please, provide userId for ref token"],
    index: true,
  },
  ip: {
    type: [String],
    trim: true,
  },
  userAgent: {
    type: [String],
    trim: true
  }
}, { timestamps: true });


refTokenSchema.methods.createAccessToken = function (payLoad) {
  return jwt.sign(
    payLoad,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
  )
}

refTokenSchema.methods.createRefreshToken = function (payLoad) {
  return jwt.sign(
    payLoad,
    process.env.REFRESH_TOKEN_SECRET_KEY
  )
}

module.exports = mongoose.model("refToken", refTokenSchema);