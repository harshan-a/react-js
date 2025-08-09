const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  BadRequest,
  UnauthorizedRequest,
  ConflictRequest,
} = require("../errors");
const RefToken = require("./refTokenModel");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    maxlength: [20, "Usename should not exceed 20 char"],
    minlength: [3, "Username should have more then 3 char"],
    unique: true,
    index: true,
    select: true,
    // uppercase: true,
    // lowercase: true,
    // enum: ["user1", "user2"]
    // enum: {
    //   values: ["user1", "user2"],
    //   message: "Invalid username"
    // }
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    trim: true,
    select: false,
    // set: function(pass) {
    //   if(!pass) throw new Error("err");
    //   const hashedPassword = bcrypt.hashSync(pass, 10);
    //   return hashedPassword;
    // },
  }
})

userSchema.pre("save", async function () {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
})


userSchema.method({
  createAccessToken: function () {
    return jwt.sign(
      { userId: this._id, userName: this.username },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
    )
  },
  createRefreshToken: function () {
    return jwt.sign(
      { userId: this._id, userName: this.username },
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
  },
  comparePassword: function (password) {
    return bcrypt.compare(password, this.password);
  },
  updateRefTokenDB: function ({ req, userId, refreshToken }) {
    const {
      ip,
      headers: { "user-agent": userAgent }
    } = req;
    return RefToken.findOneAndUpdate(
      { userId },
      {
        $addToSet: {
          token: refreshToken,
          ip,
          userAgent
        },
      },
      {
        runValidators: true,
        upsert: true,
        new: true
      }
    )
  }
})

module.exports = mongoose.model("Users", userSchema);