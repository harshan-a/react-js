import axios from "axios"
// import dayjs from "dayjs"
import { Routes, Route } from "react-router"
import { useState, useEffect } from "react"

import HomePage from "./pages/homepage/HomePage";
import Checkout from "./pages/checkout/Checkout";
import Orders from "./pages/orders/Orders";
import Tracking from "./pages/Tracking";
import NotFound from "./pages/NotFound";

import './App.css'


window.axios = axios 

function App() {
  const [cart, setCart] = useState([])

  async function loadCart() {
    const res = await axios.get("/api/v1/cart-items?expand=product,deliveryOption")
    const { data: cartItems } = res.data
    cartItems && setCart(cartItems)
  }

  useEffect(() => {
    loadCart()
  }, [])

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> or */}
        <Route 
          index
          element={<HomePage cart={cart} loadCart={loadCart} />}
        />
        <Route 
          path="/checkout"
          element={<Checkout cart={cart} loadCart={loadCart} />}
        />
        <Route 
          path="/orders"
          element={<Orders cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="/tracking/:orderId/:productId"
          element={<Tracking cart={cart} />}
        />
        <Route
          path="*"
          element={<NotFound cart={cart} />}
        />
      </Routes>
    </>
  )
}

export default App
