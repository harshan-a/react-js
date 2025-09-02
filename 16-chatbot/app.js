require("dotenv").config();

// import dependencies :
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors")
const { xss } = require('express-xss-sanitizer');
const rateLimiter = require("express-rate-limit");
const morgan = require("morgan");


// import db, errorHandler, notFound middlewares :
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const checkAuthToken = require("./middlewares/checkAuthToken");
const authMiddleware = require("./middlewares/auth");

// import custom routers;
const authRouter = require("./routers/authRouter");


// initialize app and port :
const app = express();
const PORT = process.env.PORT || 5000;


// security middlewares :
app.use(helmet());
app.use(cors({
  origin: "http://localhost:4000"
}));
app.use(xss());
// app.use(rateLimiter({
//   windowMs: 15 * 60 * 60 * 1000,
//   max: 10
// }));


// parsing middlewares :
app.use(cookieParser());
app.use(express.json());

// log request
// app.use(morgan("dev"));

// auth middleware;
// app.use(checkAuthToken);

// app.get("/", checkAuthToken, (req, res, next) => {
//   if(req.token) {
//     return authMiddleware(req, res, next);
//   }

//   res.redirect("/index.html");
// })

// serve static files
app.use(express.static("./public/dist"));



// custom routes;
// app.use("/api/v1/", authRouter);



// error handling routes :
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("CONNECTED TO DATABASE");
    app.listen(PORT, (err) => {
      if(err) throw err;
      console.log("Server is running on port " + PORT + "...");
    })

  } catch (err) {
    console.log(err);
  }
}
start()
