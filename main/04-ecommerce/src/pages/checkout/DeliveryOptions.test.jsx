import dayjs from "dayjs"
import axios from "axios"

import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import DeliveryOptions from "./DeliveryOptions"

vi.mock("axios")

describe("DeliveryOptions component", () => {
  let loadCart = vi.fn()
  let deliveryOptions = []
  let user

  beforeEach(() => {
    user = userEvent.setup()

    deliveryOptions = [
      {
        _id: "1",
        deliveryDays: 7,
        priceCents: 0,
        estimatedDeliveryTimeMs: dayjs().add(7, "day")
      },
      {
        _id: "2",
        deliveryDays: 3,
        priceCents: 499,
        estimatedDeliveryTimeMs: dayjs().add(3, "day")
      },
      {
        _id: "3",
        deliveryDays: 1,
        priceCents: 999,
        estimatedDeliveryTimeMs: dayjs().add(1, "day")
      }
    ]

  })

  it("displays the correct options", () => {
    const cartItem = {
      deliveryOption: {
        _id: "1"
      },
      product: {
        _id: "1"
      },
      _id: "1"
    }

    render(
      <DeliveryOptions 
        cartItem={cartItem} 
        deliveryOptions={deliveryOptions}
        loadCart={loadCart}
      />
    )

    const deliveryOptionsElems = screen.getAllByTestId("delivery-option")

    expect(deliveryOptionsElems.length).toBe(3)

    expect(
      // within(deliveryOptionsElems[0]).getByText("FREE Shipping")
      within(deliveryOptionsElems[0]).getByTestId("delivery-option-price").textContent
    ).toBe("FREE Shipping")

    expect(
      within(deliveryOptionsElems[0]).getByTestId("delivery-option-date").textContent
    ).toBe(dayjs().add(7, "day").format("dddd, MMMM D"))

    expect(
      within(deliveryOptionsElems[0]).getByTestId("delivery-option-input")
    ).toHaveAttribute("checked", "")

  })

  it("change the delivery option", async () => {
    const cartItem = {
      deliveryOption: {
        _id: "1"
      },
      product: {
        _id: "1"
      },
      _id: "1"
    }

    render(
      <DeliveryOptions 
        cartItem={cartItem} 
        deliveryOptions={deliveryOptions}
        loadCart={loadCart}
      />
    )

    const deliveryOptionsElems = screen.getAllByTestId("delivery-option")

    await user.click(deliveryOptionsElems[1])

    expect(axios.patch).toHaveBeenCalledWith(
      "/api/v1/cart-items/1", {
        deliveryOption: "2"
      }
    )

    expect(loadCart).toHaveBeenCalled()

  })
})