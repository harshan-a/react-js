import { Link } from "react-router";

import { calculateCartQuantity } from "../../utils/calculateCartQuantity"

import logo from "../../assets/images/logo.svg";
import mobileLogo from "../../assets/images/mobile-logo.svg";
import checkoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";

import "./CheckoutHeader.css";

export default function CheckoutHeader({ cart }) {
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src={logo} />
            <img className="mobile-logo" src={mobileLogo} />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            to="/">{calculateCartQuantity(cart)} items</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src={checkoutLockIcon} />
        </div>
      </div>
    </div>
  );
}