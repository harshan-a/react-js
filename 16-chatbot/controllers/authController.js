const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const {
  BadRequest, UnauthorizedRequest
} = require("../errors");


const User = require("../models/userModel");


async function register (req, res) {
  let user = await User.create(req.body);
  const token = user.createAccessToken();
  const refreshToken = user.createRefreshToken();

  user.refreshTokens.push(refreshToken);
  user.$locals.disableSaveHook = true;
  await user.save();

  user = user.toObject();
  delete user.password;
  delete user.refreshTokens;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24 * 7
  });


  res
    .status(StatusCodes.CREATED)
    .json({token, data: user, msg: "Registered."});
}

async function login (req, res) {
  const { email, password } = req.body;
  if(!email) throw new BadRequest("Email field is required");
  if(!password) throw new BadRequest("Password field is required");

  let user = await User.findOne(
    {email}, 
    "+password +refreshTokens"
  );
  if(!user) throw new UnauthorizedRequest("Email not found, <a href='/register'>Click here</a> to register");

  const passwordCheck = await user.comparePassword(password);
  if(!passwordCheck) throw new UnauthorizedRequest("Incorrect password");

  const token = user.createAccessToken();
  const refreshToken = user.createRefreshToken();

  user.refreshTokens.push(refreshToken);
  user.$locals.disableSaveHook = true;
  await user.save();

  user = user.toObject();
  delete user.password;
  delete user.refreshTokens;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  res
    .status(StatusCodes.OK)
    .json({token, data: user, msg: "Logged in."})
}


async function refreshToken (req, res) {
  const { refreshToken } = req.cookies;
  if(!refreshToken) 
    throw new BadRequest("No refresh token provided");

  const user = await User.findOne({
    refreshTokens: { $elemMatch: { $eq: refreshToken }}
  }, "+password +refreshTokens");
  if(!user) 
    throw new UnauthorizedRequest("Refresh token no longer allowed");

  jwt.verify(
    refreshToken, 
    process.env.REFRESH_TOKEN_SECRET, 
    async (err, payLoad) => {
      if(err) 
        throw new UnauthorizedRequest("Unauthorized access. " + err.message);

      const token = user.createAccessToken();
      const newRefreshToken = user.createRefreshToken();

      user.refreshTokens = user.refreshTokens.map(t => {
        if(t === refreshToken) {
          return newRefreshToken;
        }
        return t;
      })
      await user.save();

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 24 * 7 
      })

      res
        .status(StatusCodes.OK)
        .json({success: true, token});
    }
  )



}

module.exports = {
  login, register, refreshToken
}