// console.log("Hello, World!!!");
require("dotenv").config();

// import dependencies :
const express = require("express");
const cookieParser = require("cookie-parser");
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimiter = require("express-rate-limit");

// import db, errorHandler, notFound :
const connectDB = require("./db/connect.js");
const errorHandlerMiddle = require("./middleware/error-handler.js");
const notFound = require("./middleware/not-found.js");

// import routers and middlerwares:
const authRouter = require("./routers/authRouter.js");
const userRouter = require("./routers/userRouter.js");
const authenticationMiddleware = require("./middleware/auth.js");



// initialize app and port :
const app = express();
const PORT = process.env.PORT || 5000;

// common middleware :
app.use(express.static("./public"));
app.use(express.json());
app.use(cookieParser());


app.set('trust proxy', 1);

// security middleware :
app.use(cors({
  origin: "http://localhost:4000/"
}));
app.use(helmet());
app.use(xss());



// routers
app.use(
  "/api/v1/auth", 
  rateLimiter({
    windowMs: 1000 * 60 * 15,
    max: 10
  }),
  authRouter
);
app.use(
  "/api/v1/user",
  authenticationMiddleware, 
  userRouter
);
// app.get("/", (req, res) => {
//   // console.log(req.get("host"));
//   // throw new CustomError({msg: "hleo", statusCode: 400, success: false});
//   res.send("hello");
// })

// documentation route :
const swaggerDoc = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// error handling routes :
app.use(notFound);
app.use(errorHandlerMiddle);



// start server
const start = async () => {
  try {
    const db = await connectDB(process.env.MONGO_URI);
    db && console.log("CONNECTED TO DATABASES");
    app.listen(PORT, err => {
      if(err) 
        return console.log("Error in running the server");
      console.log("Server is running on port " + PORT + "...");
    })

  } catch(err) {
    console.log(err);
  }
}

start();