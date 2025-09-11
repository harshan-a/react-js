import axios from "axios"
import dayjs from "dayjs"

import { Link, useParams } from "react-router"
import { useState, useEffect } from "react"

import Header from "../components/Header";
import type { Cart, Order, Product } from "../utils/types";

import "./Tracking.css";

type TrackingProps = {
  cart: Cart
}

function Tracking({ cart }: TrackingProps) {
  const { orderId, productId } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  // const renderCount = useRef(0)

  useEffect(() => {
    async function fetchOrder() {
      const response: any = await axios.get("/api/v1/orders/" + orderId + "?expand=product")
      const { data: order }: {data: Order} = response.data
      setOrder(order)
    }

    fetchOrder()
    // console.log(orderId)

  }, [orderId])
  // renderCount.current++
  // console.log("Render #", renderCount.current, "orderId:", orderId)

  if (!order) {
    return null
  }

  const orderProduct = order.products.find((orderProduct) => (orderProduct.product as Product)._id === productId)

  if (!orderProduct) return null

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs

  let progress = (timePassedMs / totalDeliveryTimeMs) * 100
  if(progress > 100) progress = 100

  let isPreparing = false
  let isShipped = false
  let isDelivered =false
  if(progress < 33) 
    isPreparing = true
  if(progress >= 33 && progress < 100 )
    isShipped = true
  if(progress === 100)
    isDelivered = true

  // console.log(progress)

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/png" href="/tracking-favicon.png" />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>


          <div className="delivery-date">
            {progress >= 100 ? "Delivered on " : "Arriving on "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">
            {(orderProduct.product as Product).name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={(orderProduct.product as Product).image} />

          <div className="progress-labels-container">
            <div 
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div 
              className={`progress-label ${isShipped && "current-status"}`}
            >
              Shipped
            </div>
            <div 
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{width: progress + "%"}}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tracking;