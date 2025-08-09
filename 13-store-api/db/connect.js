const mongoose = require("mongoose");


const connectDB = (url) => {
  return mongoose.connect(url);

  // to use multiple database, by store this function's return value in variable and use that variable to create model;
  // example :
  // const db1 = await connnectDB(db1_url); [hint: mongoose.connect() is async function]
  // const Collection_Name = db1.model("collection_name", schema);
}

module.exports = connectDB;