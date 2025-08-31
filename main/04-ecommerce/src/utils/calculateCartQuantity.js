export function calculateCartQuantity(cart) {
  let cartQuantity = 0
  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity
  })

  return cartQuantity
}