import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem.jsx";
import Notification from "../Notification/Notification";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartActions";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import styles from "./cart.module.css";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  let navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    if (quantity >= stock) return;
    dispatch(addItemsToCart(id, quantity + 1));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity <= 1) {
      dispatch(removeItemsFromCart(id));
      return;
    }
    dispatch(addItemsToCart(id, quantity - 1));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <div className={styles.container}>
      <Notification notify={notify} setNotify={setNotify} />
      <div className={`josefin_sans_400 ${styles.header}`}>Your Cart</div>
      <div className={styles.content}>
        {cartItems.length === 0 ? (
          <div className={styles.empty_cart}>
            <div className={styles.icon}>
              <RemoveShoppingCartIcon sx={{ fontSize: "5vmax" }} />
            </div>
            <div className={`josefin_sans_700 ${styles.text}`}>
              No items in your cart
            </div>
            <Link className={styles.view_products} to="/products">
              View Products
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.left}>
              <div className={`josefin_sans_700 ${styles.left_header}`}>
                <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </div>
              <div className={styles.cart_item_container}>
                {cartItems &&
                  cartItems.map((item) => (
                    <CartItem
                      item={item}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      key={item.product}
                    />
                  ))}
              </div>
            </div>
            <div className={styles.right}>
              <div className={`josefin_sans_700 ${styles.right_header}`}>
                Cart Totals
              </div>
              <div className={styles.totals_container}>
                <div className={styles.total_price}>
                  <div className="lato_700">Total:</div>
                  <div className="lato_400">
                    ₹
                    {cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </div>
                </div>
                <button onClick={checkoutHandler}>Proceed to checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
