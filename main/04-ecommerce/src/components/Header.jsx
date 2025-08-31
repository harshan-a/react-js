import { 
  Link, 
  NavLink, 
  useNavigate, 
  // useSearchParams 
} from "react-router"
import { useState } from "react"

import { calculateCartQuantity } from "../utils/calculateCartQuantity"

import logoWhite from "../assets/images/logo-white.svg"
import mobileLogoWhite from "../assets/images/mobile-logo-white.svg"
import searchIcon from "../assets/images/icons/search-icon.png"
import cartIcon from "../assets/images/icons/cart-icon.png"


import "./Header.css"

/*
const string = prompt("Enter the name")
// console.log(typeof string)
const length = string.length
const mod = length % 3
const array = []
let i = 0;
let end = 0;
if(mod === 0) {
  i = length / 3
  end = i + i
}
if(mod === 1) {
  i = Math.floor(length / 3)
  end = i + i + 1
}
if(mod === 2) {
  i = Math.ceil(length / 3)
  end = i + i -1
}
array.push(string.substring(0, i))
array.push(string.substring(i, end))
array.push(string.substring(end))
console.log(String(array))
*/

/*
const range1 = [3, 5]
const range2 = [10, 15]
const range3 = [3, 10]
const full = []
for(let i = range1[0]; i <= range1[1]; i++)
  if(!full.includes(i)) full.push(i)
for(let i = range2[0]; i <= range2[1]; i++)
  if(!full.includes(i)) full.push(i)
for(let i = range3[0]; i <= range3[1]; i++)
  if(!full.includes(i)) full.push(i)

console.log(full.length)
*/

/*
const array = [1, 2, 1]
const length = array.length
const halfArrayLength = length / 2
const obj = {}
array.forEach(a => obj[a] = obj[a] + 1 || 1)
for(let key in obj) {
  obj[key] > halfArrayLength && console.log(key)
}
// console.log(obj)
*/



function Header({ cart }) {
  // const [searchParams] = useSearchParams()
  // const searchText = searchParams.get("search")
  // const [search, setSearch] = useState(searchText || "")
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  function handleSearchUpdate(e) {
    const { value:search } = e.target
    setSearch(search)
    navigate(`/?search=${search}`)
  }

  function handleKeyDown (e) {
    if(e.key === "Enter") {
      handleSearchEvent()
    }
  }

  function handleSearchEvent () {
    // navigate(`/?search=${search}`)
    setSearch("")
  }

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src={logoWhite} />
          <img className="mobile-logo"
            src={mobileLogoWhite} />
        </Link>
      </div>

      <div className="middle-section">
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Search" 
          value={search}
          onChange={handleSearchUpdate}
          onKeyDown={handleKeyDown}
        />

        <button className="search-button" onClick={handleSearchEvent}>
          <img className="search-icon" src={searchIcon} />
        </button>
      </div>

      <div className="right-section">
        {/* NavLink will add the class called "active", in this case add to order-link or header-link*/}
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cartIcon} />
          <div className="cart-quantity">
            {calculateCartQuantity(cart)}
          </div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  )
}

export default Header