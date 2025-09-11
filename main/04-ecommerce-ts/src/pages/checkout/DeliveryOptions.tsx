import dayjs from "dayjs"
import axios from "axios"

import { formatMoney } from "../../utils/money"
import type { 
  CartItem, 
  DeliveryOptions as DeliveryOptionsType, 
  LoadCart, 
  Product,
  DeliveryOption
} from "../../utils/types"

type DeliveryOptionsProps = {
  cartItem: CartItem
  deliveryOptions: DeliveryOptionsType
  loadCart: LoadCart
}

export default function DeliveryOptions({ cartItem, deliveryOptions, loadCart }: DeliveryOptionsProps) {

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {
        deliveryOptions.map(deliveryOption => {
          let priceString = "FREE Shipping"
          if (deliveryOption.priceCents > 0) {
            priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`
          }

          async function handleDeliveryOption () {
            await axios.patch("/api/v1/cart-items/" + (cartItem.product as Product)._id, {
              deliveryOption: deliveryOption._id
            })
            await loadCart()
          }

          return (
            <div
              className="delivery-option"
              key={deliveryOption._id}
              onClick={handleDeliveryOption}
              data-testid="delivery-option"
            >
              <input
                type="radio"
                checked={
                  (cartItem.deliveryOption as DeliveryOption)._id === deliveryOption._id
                }
                onChange={() => {}}
                className="delivery-option-input"
                name={`delivery-option-${cartItem._id}`}
                data-testid="delivery-option-input"
              />
              <div>
                <div className="delivery-option-date" data-testid="delivery-option-date">
                  {dayjs(deliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                </div>
                <div className="delivery-option-price" data-testid="delivery-option-price">
                  {priceString}
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
