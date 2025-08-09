const { StatusCodes } = require("http-status-codes");

const Users = require("../models/userModel");
const {
  BadRequest,
  UnauthorizedRequest,
} = require("../errors/index.js");


const dashboard = async (req, res, next) => {
  const { userId, userName } = req.user;

  // data = users.find(u => u.username === user.username);
  const data = await Users.findOne({ _id: userId, username: userName }).select("+password");
  if (!data)
    throw new UnauthorizedRequest("User not found");

  const luckyNumber = Math.ceil(Math.random() * 100);
  res.status(200).json({ msg: `-${luckyNumber}- Dashboard Activated Successfully...`, data });
}

const deleteAllUsers = async (req, res, next) => {
  await Users.deleteMany({});
  res.sendStatus(StatusCodes.OK);
}


module.exports = { dashboard, deleteAllUsers }