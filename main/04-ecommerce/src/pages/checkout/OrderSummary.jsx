import axios from "axios"
import { useEffect, useState } from "react"

import DeliveryDate from "./DeliveryDate"
import CartItemDetails from "./CartItemDetails"

import DeliveryOptions from "./DeliveryOptions"

function OrderSummary({ cart, loadCart }) {

  const [deliveryOptions, setDeliveryOptions] = useState([])


  useEffect(() => {
    async function fetchDeliveryOptions() {
      let res = await axios.get("/api/v1/delivery-options?estimatedDeliveryTime=true")
      const { data: deliveryOptions } = res.data
      deliveryOptions && setDeliveryOptions(deliveryOptions)
    }
    fetchDeliveryOptions()
  }, [])

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map(cartItem => {

          return (
            <div
              key={cartItem._id}
              className="cart-item-container"
            >
              <DeliveryDate
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />

              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} loadCart={loadCart} />

                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default OrderSummary