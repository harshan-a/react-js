import dotenv from "dotenv"; dotenv.config()

// import dependencies;
import express from "express"
import helmet from "helmet"
import cors from "cors"
import { xss } from "express-xss-sanitizer"
import rateLimiter from "express-rate-limit"
import cookieParser from "cookie-parser"
import morgan from "morgan"

// import db and middlewares;
import connectDB from "./db/connect.js"
import errorHandlingMiddleware from "./middlewares/errorHandling.js"
import notFoundMidddleware from "./middlewares/notFound.js"

// import main route;
import productsRouter from "./routers/productsRouter.js"
import ordersRouter from "./routers/ordersRouter.js"
import cartItemsRouter from "./routers/cartItemsRouter.js"
import deliveryOptionsRouter from "./routers/deliveryOptionsRouter.js"
import paymentSummaryRouter from "./routers/paymentSummaryRouter.js"
import reset from "./routers/reset.js"

// initialize app and port;
const app = express()
const port = process.env.PORT || 5000

// security middlewares;
app.use(helmet())
app.use(xss())
app.use(cors({
  origin: "http://localhost:5173/"
}))
// app.use(rateLimiter({
//   windowMs: 1000 * 60 * 15,
//   max: 15
// }))

// parsing middleware;
app.use(cookieParser())
app.use(express.json())

// morgan
// app.use(morgan("dev"))

// serving static files;
app.use("/images", express.static("./public/images"))
app.use(express.static("./public/dist"))

// main routes;
app.use("/api/v1/products", productsRouter)
app.use("/api/v1/orders", ordersRouter)
app.use("/api/v1/cart-items", cartItemsRouter)
app.use("/api/v1/delivery-options", deliveryOptionsRouter)
app.use("/api/v1/payment-summary", paymentSummaryRouter)
app.use("/api/v1/reset", reset)
// app.get("/", (req, res) => {
//   res.sendStatus(200);
// })

// error handling middlewares;
app.use(errorHandlingMiddleware);
app.use(notFoundMidddleware);



async function start () {
  try {
    // await async function() {return new Promise(res => setTimeout(res, 1000))}()
    // await async function() {return new Promise(res => setTimeout(() => {console.log("hello"); res()}, 1000))}()
    await connectDB(process.env.MONGO_URI)
    console.log("Connected to database")
    app.listen(port, console.log("Server is running on port " + port + "..."))
    
  } catch (err) {
    console.log(err)
  }
}

start()
