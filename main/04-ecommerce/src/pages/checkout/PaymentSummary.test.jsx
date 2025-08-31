import axios from "axios"
import { MemoryRouter, useLocation } from "react-router"

import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import PaymentSummary from "./PaymentSummary"

vi.mock("axios")

describe("PaymentSummary component", () => {
  let loadCart
  let user

  function Location() {
    const location = useLocation()
    return (
      <div data-testid="url-path">{location.pathname}</div>
    )
  }

  beforeEach(async () => {
    loadCart = vi.fn()

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/v1/payment-summary") {
        return {
          data: {
            data: {
              totalItems: 3,
              productCostCents: 4275,
              shippingCostCents: 499,
              totalCostBeforeTaxCents: 4774,
              taxCents: 477.4,
              totalCostCents: 5251.6
            }
          }
        }
      }
    })

    await waitFor(() => {
      render(
        <MemoryRouter>
          <PaymentSummary loadCart={loadCart} cart={[]} />
          <Location />
        </MemoryRouter>
      )
    })

    user = userEvent.setup()

  })

  it("display the details correctly", async () => {
    // await waitFor(() => {
    expect(screen.getByText("Items (3):")).toBeInTheDocument()
    // })

    expect(
      screen.getByTestId("shipping-cost")
    ).toHaveTextContent("$4.99")

    expect(
      screen.getByTestId("product-cost")
    ).toHaveTextContent("$42.75")

    expect(
      screen.getByTestId("total-cost-before-tax")
      // screen.getByTestId("total-cost-before-tax")
    ).toHaveTextContent("$47.74")

    expect(
      screen.getByTestId("tax")
    ).toHaveTextContent("$4.77")

    expect(
      screen.getByTestId("total-cost")
    ).toHaveTextContent("$52.52")

  })

  it("place the order", async () => {
    const placeOrderBtn = screen.getByTestId("place-order-btn")

    await user.click(placeOrderBtn)

    expect(axios.post).toHaveBeenCalledWith("/api/v1/orders")
    expect(loadCart).toHaveBeenCalled()
    expect(screen.getByTestId("url-path")).toHaveTextContent("/orders")
  })
})
