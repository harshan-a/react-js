const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
    maxlength: [50, "Name should not exceeds 50 characters"],
    minlength: [3, "Name should have atleast 3 characters"],
    match: [
      /^([\w\d.]*)$/,
      "Name should not have any special characters"
    ],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    trim: true,
    unique: true, 
    index: true,
    match: [
      /^[a-z0-9.]+@[a-z]+\.[a-z]+$/,
      "Invalid Email"
    ]
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    select: false
  },
  refreshTokens: {
    type: [String],
    select: false
  }
}, { timestamps: true})

// mongoose middleware;
userSchema.pre("save", async function(next) {
  if(this.$locals.disableSaveHook) 
    return next();
  const round = 10;
  const salt = await bcrypt.genSalt(round);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// instance methods;
userSchema.methods.createAccessToken = function () {
  return jwt.sign(
    {
      username: this.name,
      userId: this._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_LIFETIME }
  );
}
userSchema.methods.createRefreshToken = function () {
  return jwt.sign(
    {
      username: this.name,
      userId: this._id
    },
    process.env.REFRESH_TOKEN_SECRET
  );
}
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("user", userSchema);