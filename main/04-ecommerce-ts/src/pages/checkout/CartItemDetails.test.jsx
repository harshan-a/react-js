import axios from "axios"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import CartItemDetails from "./CartItemDetails"

vi.mock("axios")

describe("CartItemDetails component", () => {
  let loadCart
  let cartItem
  let user

  beforeEach(() => {
    loadCart = vi.fn()
    user = userEvent.setup()

    cartItem = {
      _id: "1",
      quantity: 3,
      product: {
        _id: "68a5c069a271d77448192c55",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: { stars: 4.5, count: 87 },
        priceCents: 1090,
        keywords: ["socks", "sports", "apparel"]
      }
    }
    render(<CartItemDetails cartItem={cartItem} loadCart={loadCart} />)
  })


  it("displays the cart item correctly", () => {

    expect(
      screen.getByTestId("cart-product-image")
    ).toHaveAttribute("src", "images/products/athletic-cotton-socks-6-pairs.jpg")

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument()

    expect(
      screen.getByText("$10.90")
    ).toBeInTheDocument()

    expect(
      screen.getByTestId("quantity-label")
    ).toHaveTextContent(3)
    
    expect(
      screen.getByTestId("quantity-label").classList.contains("show")
    ).toBe(true)

    expect(
      screen.getByTestId("product-quantity-input").classList.contains("show")
    ).toBe(false)
  })

  it("update the cart quantity", async () => {
    const quantityLabel = screen.getByTestId("quantity-label")
    const productQuantityInput = screen.getByTestId("product-quantity-input")
    const updateQuantityLink = screen.getByTestId("update-quantity-link")

    expect(
      quantityLabel.classList.contains("show")
    ).toBe(true)

    expect(
      productQuantityInput.classList.contains("show")
    ).toBe(false)

    await user.click(screen.getByTestId("update-quantity-link"))

    expect(
      quantityLabel.classList.contains("show")
    ).toBe(false)

    expect(
      productQuantityInput.classList.contains("show")
    ).toBe(true)

    expect(axios.patch).toHaveBeenCalledTimes(0)

    expect(loadCart).toHaveBeenCalledTimes(0)

    await user.type(productQuantityInput, "5")
    await user.click(updateQuantityLink)

    expect(
      quantityLabel.classList.contains("show")
    ).toBe(true)

    expect(
      productQuantityInput.classList.contains("show")
    ).toBe(false)

    expect(axios.patch).toHaveBeenCalledWith(
      "/api/v1/cart-items/68a5c069a271d77448192c55", {
        quantity: 35 // because already 3 in the input field
      }
    )

    expect(loadCart).toHaveBeenCalled()
    
  })


  it('delete the cart item', async () => {
    const deleteQuantityLink = screen.getByTestId("delete-quantity-link")

    await user.click(deleteQuantityLink)

    expect(axios.delete).toHaveBeenCalledWith(
      "/api/v1/cart-items/68a5c069a271d77448192c55"
    )

    expect(loadCart).toHaveBeenCalled()

  })
})