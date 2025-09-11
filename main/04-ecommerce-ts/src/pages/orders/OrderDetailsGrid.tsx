import axios from "axios"
import dayjs from "dayjs"
import { Fragment } from "react"
import { Link } from "react-router"

import buyAgainIcon from "../../assets/images/icons/buy-again.png";
import type { Order, LoadCart, Product } from "../../utils/types"

type OrderDetailsGridProps = {
  order: Order
  loadCart: LoadCart
}

function OrderDetailsGrid({ order, loadCart }: OrderDetailsGridProps) {

  return (
    <div className="order-details-grid">
      {
        order.products.map(orderProduct => {
          const {
            product,
            quantity,
            estimatedDeliveryTimeMs
          } = orderProduct

          async function addToCart() {
            await axios.post("/api/v1/cart-items", {
              productId: (product as Product)._id,
              quantity: 1
            })
            await loadCart()
          } 

          return (
            <Fragment key={(product as Product)._id}>
              {/* <> */}
              <div className="product-image-container">
                <img src={(product as Product).image} />
              </div>

              <div className="product-details">
                <div className="product-name">
                  {(product as Product).name}
                </div>
                <div className="product-delivery-date">
                  Arriving on: {dayjs(estimatedDeliveryTimeMs).format("MMMM D")}
                </div>
                <div className="product-quantity">
                  Quantity: {quantity}
                </div>
                <button className="buy-again-button button-primary">
                  <img className="buy-again-icon" src={buyAgainIcon} />
                  <span
                    className="buy-again-message"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </span>
                </button>
              </div>

              <div className="product-actions">
                <Link to={`/tracking/${order._id}/${(product as Product)._id}`}>
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </Link>
              </div>
              {/* </> */}
            </Fragment>
          )
        })
      }
    </div>
  )
}

export default OrderDetailsGrid