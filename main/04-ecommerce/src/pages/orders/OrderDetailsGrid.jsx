import axios from "axios"
import dayjs from "dayjs"
import { Fragment } from "react"
import { Link } from "react-router"

import buyAgainIcon from "../../assets/images/icons/buy-again.png";


function OrderDetailsGrid({ order, loadCart }) {

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
              productId: product._id,
              quantity: 1
            })
            await loadCart()
          } 

          return (
            <Fragment key={product._id}>
              {/* <> */}
              <div className="product-image-container">
                <img src={product.image} />
              </div>

              <div className="product-details">
                <div className="product-name">
                  {product.name}
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
                <Link to={`/tracking/${order._id}/${product._id}`}>
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