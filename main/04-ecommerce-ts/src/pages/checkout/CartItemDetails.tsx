import axios from "axios"
import { useState, useRef, useEffect, type ChangeEvent, type KeyboardEvent } from "react"
import { formatMoney } from "../../utils/money"
import type { CartItem, LoadCart, Product } from "../../utils/types"

type CartItemDetailsProps = {
  cartItem: CartItem
  loadCart: LoadCart
}


function CartItemDetails({ cartItem, loadCart }: CartItemDetailsProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [quantity, setQuantity] = useState(cartItem.quantity)
  const quantityInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    quantityInputRef.current && quantityInputRef.current.focus()
  }, [isUpdating])


  async function handleDeleteCart() {
    await axios.delete("/api/v1/cart-items/" + (cartItem.product as Product)._id)
    await loadCart()
  }

  async function handleUpdatingCart() {
    if (isUpdating) {
      await axios.patch("/api/v1/cart-items/" + (cartItem.product as Product)._id, {
        quantity
      })
      await loadCart()
    }
    // if(!isUpdating) 
    setIsUpdating(prev => !prev)
  }

  function handleQuantityUpdate (e: ChangeEvent<HTMLInputElement>) {
    const quantity = Number(e.target.value)
    if(!quantity && quantity !== 0) {
      return;
    }
    setQuantity(quantity)
  }

  function handleKeyDown (e: KeyboardEvent<HTMLInputElement>) {
    if(e.key === "Enter") {
      handleUpdatingCart()
    }
    if(e.key === "Escape") {
      setQuantity(cartItem.quantity)
      setIsUpdating(false)
    }
  }

  return (
    <>
      <img className="product-image"
        src={(cartItem.product as Product).image}
        data-testid= "cart-product-image" />

      <div className="cart-item-details">
        <div className="product-name">
          {(cartItem.product as Product).name}
        </div>
        <div className="product-price">
          {formatMoney((cartItem.product as Product).priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:&nbsp;
            <input
              ref={quantityInputRef}
              type="text"
              value={quantity}
              className={`product-quantity-input ${isUpdating ? "show" : ""}`}
              onChange={handleQuantityUpdate}
              onKeyDown={handleKeyDown}
              data-testid="product-quantity-input"
            />
            <span
              className={`quantity-label ${isUpdating ? "" : "show"}`}
              data-testid="quantity-label"
            >
              {cartItem.quantity}
            </span>
          </span>
          <span
            className={`update-quantity-link link-primary`}
            onClick={handleUpdatingCart}
            data-testid="update-quantity-link"
          >
            Update
          </span>
          <span className="delete-quantity-link link-primary" onClick={handleDeleteCart} data-testid="delete-quantity-link">
            Delete
          </span>
        </div>
      </div>
    </>
  )
}

export default CartItemDetails