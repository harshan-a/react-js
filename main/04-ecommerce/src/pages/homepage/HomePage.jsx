import { useState, useEffect } from "react"
import { useSearchParams } from "react-router"
import axios from "axios"

import Header from "../../components/Header"
import ProductsGrid from "./ProductsGrid";

import "./HomePage.css";

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')

  useEffect(() => {
    async function fetchProducts () {
      const url = `/api/v1/products${search ? `?search=${search}` : "/"}`
      const res = await axios.get(url)
      const { data:products } = res.data
      products && setProducts(products)
      // console.log(products)
      // console.log(products.length)
    }
    fetchProducts()
  }, [search])

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/png" href="/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid 
          products={products}
          loadCart={loadCart}
        />
      </div>
    </>
  );
}

export default HomePage;