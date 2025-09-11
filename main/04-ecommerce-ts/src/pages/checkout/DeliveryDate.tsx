import dayjs from "dayjs"

import type { CartItem, DeliveryOptions, DeliveryOption } from "../../utils/types"

type DeliveryDateProps = {
  cartItem: CartItem
  deliveryOptions: DeliveryOptions
}

function DeliveryDate({ cartItem, deliveryOptions}: DeliveryDateProps) {

  const selectedDeliveryOption = deliveryOptions
    .find(deliveryOption => {
      return deliveryOption._id === (cartItem.deliveryOption as DeliveryOption)._id
    })

  return (
    <div 
      className="delivery-date"
      data-testid="delivery-date"
    >
      Delivery date: {dayjs(selectedDeliveryOption?.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
    </div>
  )
}

export default DeliveryDate