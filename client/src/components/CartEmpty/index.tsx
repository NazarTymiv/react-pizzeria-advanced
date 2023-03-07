import React from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from "../../assets/img/empty-cart.png";

import "./style.scss";

const CartEmpty: React.FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>
                Cart is empty <span>😕</span>
            </h2>
            <p>
                Most likely, you haven't ordered a pizza yet.
                <br />
                To order a pizza, go to the main page.
            </p>
            <img src={cartEmptyImg} alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>Come back</span>
            </Link>
        </div>
    );
};

export default CartEmpty;
