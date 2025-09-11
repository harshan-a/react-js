import type { Cart } from "./types"

export function calculateCartQuantity(cart: Cart) {
  let cartQuantity = 0
  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity
  })

  return cartQuantity
}