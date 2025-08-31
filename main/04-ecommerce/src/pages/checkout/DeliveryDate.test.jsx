import dayjs from "dayjs"
import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"

import DeliveryDate from "./DeliveryDate"


describe("DeliveryDate component", () => {
  let deliveryOptions = []

  beforeEach(() => {
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

  it("display the date correctly for 7days", () => {
    const cartItem = {
      deliveryOption: {
        _id: "1"
      }
    }

    render(
      <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />
    )


    expect(
      screen.getByText("Delivery date: " + dayjs().add(7, "day").format("dddd, MMMM D"))
    ).toBeInTheDocument()

    expect(
      screen.getByTestId("delivery-date")
    ).toHaveTextContent(
      dayjs().add(7, "day").format("dddd, MMMM D")
    )
  })

  it("display the date correctly for 3days", () => {
    const cartItem = {
      deliveryOption: {
        _id: "2"
      }
    }

    render(
      <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />
    )

    // expect(
    //   screen.getByText("Delivery date: " + dayjs().add(7, "day").format("dddd, MMMM D"))
    // ).toBeInTheDocument()

    expect(
      screen.getByTestId("delivery-date")
    ).toHaveTextContent(
      dayjs().add(3, "day").format("dddd, MMMM D")
    ) // toHaveTextContent() will pass for substring match
  })

  it("display the date correctly for 1day", () => {
    const cartItem = {
      deliveryOption: {
        _id: "3"
      }
    }

    render(
      <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />
    )

    // expect(
    //   screen.getByText("Delivery date: " + dayjs().add(7, "day").format("dddd, MMMM D"))
    // ).toBeInTheDocument()

    expect(
      screen.getByTestId("delivery-date")
    ).toHaveTextContent(
      dayjs().add(1, "day").format("dddd, MMMM D")
    ) // toHaveTextContent() will pass for substring match
  })
})