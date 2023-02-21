import React from "react";
import { Link } from "react-router-dom";
import styles from "./cartItem.module.css";

const CartItem = ({ item, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className={` lato_400 ${styles.container}`}>
      <div className={styles.product}>
        <img src={item.image} alt="cart product" />
        <div className={styles.info}>
          <Link to={`/product/${item.product}`}>
            <h3>{item.name}</h3>
          </Link>
        </div>
      </div>
      <div className={styles.price}>₹{item.price}</div>
      <div className={styles.quantity}>
        <button
          onClick={() =>
            increaseQuantity(item.product, item.quantity, item.stock)
          }
        >
          +
        </button>
        <input
          type="number"
          className="lato_400"
          value={item.quantity}
          readOnly
        />
        <button onClick={() => decreaseQuantity(item.product, item.quantity)}>
          -
        </button>
      </div>
      <div className={styles.total}>₹{item.price * item.quantity}</div>
    </div>
  );
};

export default CartItem;
