import axios from "axios"
import { useState, useEffect, type MouseEvent } from "react"
import { useNavigate } from "react-router"

import { formatMoney } from "../../utils/money"
import type { PaymentSummaryData, Cart, LoadCart } from "../../utils/types"

type PaymentSummaryProps = {
  cart: Cart
  loadCart: LoadCart
}

export default function PaymentSummary({ cart, loadCart }: PaymentSummaryProps) {
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummaryData | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPaymentSummary() {
      try {
        const res = await axios.get("/api/v1/payment-summary")
        const { data: paymentSummary }: { data: PaymentSummaryData} = res.data
        paymentSummary && setPaymentSummary(paymentSummary)

      } catch (err) {
        console.log(err)
      }
    }
    fetchPaymentSummary()
  }, [cart])

  async function placeOrder(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    await axios.post("/api/v1/orders")
    await loadCart()
    navigate("/orders")
  }

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">
        Payment Summary
      </div>
      {paymentSummary && (
        <>
          <div className="payment-summary-row">
            <div>
              Items ({paymentSummary.totalItems}):
            </div>
            <div className="payment-summary-money"
              data-testid="product-cost"
            >
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money"
              data-testid="shipping-cost"
            >
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money"
              data-testid="total-cost-before-tax"
            >
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money"
              data-testid="tax"
            >
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money"
              data-testid="total-cost"
            >
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button 
            className="place-order-button button-primary"
            onClick={placeOrder}
            data-testid="place-order-btn"
          >
            Place your order
          </button>
        </>
      )}

    </div>
  )
}
