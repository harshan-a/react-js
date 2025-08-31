
import OrderDetailsGrid from "./OrderDetailsGrid"
import OrderHeader from "./OrderHeader"



function OrdersGrid({ orders, loadCart }) {

  return (
    <div className="orders-grid">
      {
        orders.map(order => {
          return (
            <div
              className="order-container"
              key={order._id}
            >
              <OrderHeader order={order} />
              <OrderDetailsGrid order={order} loadCart={loadCart} />
            </div>
          )
        })
      }
    </div>
  )
}

export default OrdersGrid