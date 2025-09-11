import Product from "./Product"
import type { Products, LoadCart } from "../../utils/types"

type ProductsGridProps = {
  products: Products
  loadCart: LoadCart
}

function ProductsGrid({ products, loadCart }: ProductsGridProps) {

  return (
    <div className="products-grid">
      {
        products.map(product => {
          return (
            <Product key={product._id} product={product} loadCart={loadCart} />
          )
        })
      }
    </div>
  )
}

export default ProductsGrid