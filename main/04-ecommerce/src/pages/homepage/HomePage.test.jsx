import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"

import axios from "axios"
import HomePage from "./HomePage"

vi.mock("axios")


describe("Home Page component", () => {
  let loadCart
  let user

  beforeEach(() => {
    loadCart = vi.fn()
    user = userEvent.setup()

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/v1/products/")
        return {
          data: {
            data: [{
              _id: "68a5c069a271d77448192c56",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127
              },
              priceCents: 2095,
              keywords: [
                "sports",
                "basketballs"
              ],
            }, {
              _id: "68a5c069a271d77448192c55",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: { stars: 4.5, count: 87 },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"]
            }]
          }
        }
    })

  })

  it("displays all product correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    )

    const productContainer = await screen.findAllByTestId("product-container")

    // console.log()
    expect(productContainer.length).toBe(2)

    expect(
      within(productContainer[0]).getByText("Intermediate Size Basketball")
    ).toBeInTheDocument()

    expect(
      within(productContainer[1]).getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument()
  })

  it("add a product to cart", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    )

    const productContainer = await screen.findAllByTestId("product-container")

    const addToCartBtn1 = within(productContainer[0]).getByTestId("add-to-cart-button")
    const addToCartBtn2 = within(productContainer[1]).getByTestId("add-to-cart-button")
    const quantitySelector1 = within(productContainer[0]).getByTestId("product-quantity-selector")
    const quantitySelector2 = within(productContainer[1]).getByTestId("product-quantity-selector")

    await user.selectOptions(quantitySelector1, "2")
    await user.click(addToCartBtn1)
    await user.selectOptions(quantitySelector2, "3")
    await user.click(addToCartBtn2)

    expect(axios.post).toHaveBeenNthCalledWith(1, "/api/v1/cart-items", {
      productId: "68a5c069a271d77448192c56",
      quantity: 2
    })
    expect(axios.post).toHaveBeenNthCalledWith(2, "/api/v1/cart-items", {
      productId: "68a5c069a271d77448192c55",
      quantity: 3
    })

    expect(loadCart).toHaveBeenCalledTimes(2)

  })
})