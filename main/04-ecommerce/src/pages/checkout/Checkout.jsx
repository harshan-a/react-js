import CheckoutHeader from "./CheckoutHeader"
import OrderSummary from "./OrderSummary"
import PaymentSummary from "./PaymentSummary"

import "./Checkout.css";

function Checkout({ cart, loadCart }) {


  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/png" href="/cart-favicon.png" />

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            loadCart={loadCart}
          />

          <PaymentSummary
            cart={cart}
            loadCart={loadCart}
          />
        </div>
      </div>
    </>
  );
}

export default Checkout;