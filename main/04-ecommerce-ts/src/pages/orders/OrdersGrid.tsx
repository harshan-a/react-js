
import OrderDetailsGrid from "./OrderDetailsGrid"
import OrderHeader from "./OrderHeader"

import type { LoadCart, Orders } from "../../utils/types" 

type OrdersGridProps = {
  orders: Orders
  loadCart: LoadCart
}

function OrdersGrid({ orders, loadCart }: OrdersGridProps) {

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