const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const RefToken = require("../models/refTokenModel.js");

// const fs = require("fs");
// const users = require("../data/users.json");
const {
  BadRequest,
  UnauthorizedRequest,
  ConflictRequest,
} = require("../errors/index.js");
const Users = require("../models/userModel.js");


const register = async (req, res) => {
  const { body } = req;

  if (!body) {
    throw new BadRequest("Please, provide credentials");
  }
  // const { username, password } = req.body;
  // if (!username || !password) {
  //   throw new BadRequest("Provide username and password");
  // }

  // users.forEach(user => {
  //   if(user.username === username) {
  //     throw new ConflictRequest("Username already taken");
  //   }
  // })

  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const hashedPassword = await bcrypt.hash(password, 10);

  // users.push({username, password: hashedPassword});
  // fs.writeFileSync("./data/users.json", JSON.stringify(users));

  // const user = await Users.create({ username, password: hashedPassword });

  let user = await Users.create(body);
  // const token = jwt.sign(
  // { id: user._id, username: user.username }, 
  // process.env.JWT_SECRET_KEY, 
  // { expiresIn: "1d" }
  // );
  const token = user.createAccessToken();
  const refreshToken = user.createRefreshToken();
  const refToken = await user.updateRefTokenDB({ req, userId: user._id, refreshToken });

  // const refToken = await RefToken.findOneAndUpdate(
  //   { userId: user._id },
  //   {
  //     $push: {
  //       token: refreshToken,
  //       ip,
  //       userAgent
  //     },
  //   },
  //   {
  //     runValidators: true,
  //     upsert: true,
  //     new: true
  //   }
  // )

  // const refToken = await RefToken.create({
  //   userId: user._id,
  //   token: [refreshToken],
  //   ip: [ip],
  //   userAgent: [headers["user-agent"]],
  // })


  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24 * 7
  })

  user = user.toObject();
  delete user.password;
  res.status(200).json({ msg: "Registered", token, data: user });
}

const login = async (req, res) => {
  if (!req.body)
    throw new BadRequest("Provide username and password");

  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Provide username and password");
  }

  // let user;
  // users.forEach(u => {
  //   if(u.username === username) 
  //     user = u;
  // })
  let user = await Users.findOne({ username }).select("+password");
  if (!user)
    throw new UnauthorizedRequest("User not found");

  const checkPassword = await user.comparePassword(password);
  if (!checkPassword)
    throw new UnauthorizedRequest("Incorrect Password");

  const token = user.createAccessToken();
  const refreshToken = user.createRefreshToken();
  const refToken = await user.updateRefTokenDB({ req, refreshToken, userId: user._id });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })

  user = user.toObject();
  delete user.password;
  res.status(200).json({ msg: "Logged in", token, data: user });
}

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    throw new BadRequest("No refresh token provided");

  const refToken = await RefToken.findOne({
    token: { $elemMatch: { $eq: refreshToken } }
  });
  if (!refToken)
    throw new UnauthorizedRequest("Unauthorized access. Token no longer valid");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, async (err, user) => {
    try {
      if (err)
        throw new UnauthorizedRequest("Unauthorized access. " + err.message);

      const { userId, userName } = user;
      if (String(refToken.userId) !== userId)
        throw new UnauthorizedRequest("Unauthorized access. User id not match");

      const token = refToken.createAccessToken({ userId, userName });
      const newRefreshToken = refToken.createRefreshToken({ userId, userName });

      refToken.token = refToken.token.map(t => {
        let token = t;
        if (t === refreshToken)
          return newRefreshToken;
        return token;
      })
      await refToken.save();

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 24 * 7
      })
      res.status(StatusCodes.OK).json({ success: true, token });

    } catch (err) {
      next(err);
    }
  })
}

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    const refToken = await RefToken.findOne({ token: { $elemMatch: { $eq: refreshToken } } });
    console.log(refToken)
    console.log(refreshToken);
    if (!refToken) throw "refToken not found in db";

    refToken.token = refToken.token.filter(t => t !== refreshToken);
    refToken.ip = refToken.ip.filter(ip => ip !== req.ip);
    refToken.userAgent = refToken.userAgent.filter(ua => ua !== req.headers["user-agent"]);

    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.status(StatusCodes.OK).json({ success: true, msg: "Refresh token will removed from db" });

  } catch (err) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.status(StatusCodes.OK).json({ success: true, msg: "Cookies removed, but some errors", err });
  }
}



module.exports = { login, register, refreshToken, logout };