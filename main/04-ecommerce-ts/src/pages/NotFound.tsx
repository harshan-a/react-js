import { Link } from "react-router";

import Header from "../components/Header";
import type { Cart } from "../utils/types"

import "./NotFound.css";

type NotFoundProps = {
  cart: Cart
}

export default function NotFound ({ cart }: NotFoundProps) {
  return (
    <>
      <title>Page not found</title>
      <link rel="icon" type="image/png" href="/404-favicon.png" />

      <Header cart={cart} />
      
      <div className="container">
        <span>Oops!</span>
        <p className="first-p">
          404 - PAGE NOT FOUND
        </p>
        <p className="second-p">
          The page you looking for might have been removed or is temporarily unavailable.
        </p>
        <Link to="/">
          <button className="button-primary">GO TO HOMEPAGE</button>
        </Link>
      </div>
    </>
  );
}