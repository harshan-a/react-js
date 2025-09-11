import axios from "axios"
import { useState, useRef, type ChangeEvent } from "react"
import { formatMoney } from "../../utils/money"
import checkmarkIcon from "../../assets/images/icons/checkmark.png"

import type { Product, LoadCart } from "../../utils/types"

type ProductProps = {
  product: Product
  loadCart: LoadCart
}

export default function Product({ product, loadCart }: ProductProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const timeoutIdRef = useRef(0)

  async function addToCart() {
    try {
      await axios.post("/api/v1/cart-items", {
        productId: product._id,
        quantity
      })

    } catch (err) {
      console.log(err)
    }
    
    setIsAdded(true)
    clearTimeout(timeoutIdRef.current)
    timeoutIdRef.current = setTimeout(() => {
      setIsAdded(false)
    }, 1000)

    await loadCart()
  }

  function selectQuantity (e: ChangeEvent<HTMLSelectElement>) {
    const { value:quantity } = e.target
    setQuantity(Number(quantity))
  }

  return (
    <div className="product-container" data-testid="product-container" >
      <div className="product-image-container">
        <img className="product-image"
          data-testid="product-image"
          src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select 
          value={quantity} 
          onChange={selectQuantity}
          data-testid="product-quantity-selector"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{opacity: isAdded ? 1 : 0}}>
        <img src={checkmarkIcon} />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={addToCart}
        data-testid="add-to-cart-button"
      >
        Add to Cart
      </button>
    </div>
  )
}

