import axios from "axios"
import { useState, useEffect } from "react"

import Header from "../../components/Header";
import OrdersGrid from "./OrdersGrid"

import "./Orders.css";

function Orders({ cart, loadCart }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders() {
      const res = await axios.get("/api/v1/orders?expand=product")
      const { data: orders } = res.data
      orders && setOrders(orders)
      // console.log(orders)
    }

    fetchOrders()
  }, [])

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/png" href="/orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}

export default Orders;