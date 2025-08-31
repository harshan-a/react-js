import dayjs from "dayjs"


function DeliveryDate({ cartItem, deliveryOptions}) {

  const selectedDeliveryOption = deliveryOptions
    .find(deliveryOption => {
      return deliveryOption._id === cartItem.deliveryOption._id
    })

  return (
    <div 
      className="delivery-date"
      data-testid="delivery-date"
    >
      Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
    </div>
  )
}

export default DeliveryDate