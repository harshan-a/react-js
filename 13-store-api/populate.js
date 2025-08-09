const connectDB = require("./db/connect.js");
const Product = require("./models/productsModel");
const Users = require("./models/usersModel");
const products = require("./products.json");
const users = require("./users.json");
require("dotenv").config();


const populateProducts = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    await Users.deleteMany({});
    await Users.create(users);
    console.log("Successfully Populated !!!");
    // const us = await Users.find({});
    // console.log(us)
    // connection of database is continous process so we to exit;
    // exit(0) -> success exit;
    // exit(1) -> error exit;
    process.exit(0);

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
populateProducts();