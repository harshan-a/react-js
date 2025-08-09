const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");


require("dotenv").config();
require("express-async-error"); // but express version 5, will automatically call next(err) when throw, this package is not required;


const connectDB = require("./db/connect.js");
const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

const productsRouter = require("./routers/productsRouter.js");



//middleware
app.use(express.json());

// cors - cross origin resource sharing
//  is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources
app.use(cors({
  origin: "http://localhost:4000"
}));


//routes
app.get("/", (req, res) => {
  res.status(200).send("Home page");
})

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);





async function start() {
  try {
    const db = await connectDB(process.env.MONGO_DB);
    /*
    console.log("aaa aaa a a a".replaceAll(" ", "_"));
    console.log("abheloabc abc heloabc".match(/abc/g));
    const patt = new RegExp("^abc");
    console.log(patt);
    console.log("hello, world!".match(/(?<hello>l)/g));
    */
    // const products = await db.Collection("products")

    db && console.log("CONNECTED TO DATABASE");
    app.listen(PORT, (err) => {
      if(err) {
        console.error(err);
        return;
      }
      console.log("Server is running on PORT " + PORT + "...");
    })

  } catch (err) {
    console.log(err);
  }
}
start();