import axios from "axios"
import { useEffect, useState } from "react"

import DeliveryDate from "./DeliveryDate"
import CartItemDetails from "./CartItemDetails"

import DeliveryOptions from "./DeliveryOptions"
import type { 
  DeliveryOptions as DeliveryOptionsType, 
  Cart, 
  LoadCart 
} from "../../utils/types"

type OrderSummaryProps = {
  cart: Cart
  loadCart: LoadCart
}


function OrderSummary({ cart, loadCart }: OrderSummaryProps) {

  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptionsType>([])


  useEffect(() => {
    async function fetchDeliveryOptions() {
      let res = await axios.get("/api/v1/delivery-options?estimatedDeliveryTime=true")
      const { data: deliveryOptions }: { data: DeliveryOptionsType } = res.data
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