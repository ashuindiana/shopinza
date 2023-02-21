import React, { useState, useEffect } from "react";
import Notification from "../Notification/Notification";
import { useMatch, Link } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import styles from "./orderDetails.module.css";

const OrderDetails = () => {
  const match = useMatch("/order/:id");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setNotify({
        isOpen: true,
        message: error,
        type: "error",
      });
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Notification notify={notify} setNotify={setNotify} />
          <div className={styles.header}>Order #{order._id}</div>
          <div className={styles.content}>
            <div className={styles.info}>
              <div className={styles.shippingInfo}>
                <h3>Shipping Info</h3>
                <div>
                  <p>
                    Name: <span>{order.user && order.user.name}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Phone:{" "}
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Address:{" "}
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </p>
                </div>
              </div>
              <div className={styles.paymentInfo}>
                <h3>Payment Info</h3>
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColour_light"
                        : "redColour_light"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>
                    Amount: <span>₹{order.totalPrice && order.totalPrice}</span>
                  </p>
                </div>
              </div>
              <div className={styles.orderStatusInfo}>
                <h3>Order Status</h3>
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColour_light"
                        : "redColour_light"
                    }
                  >
                    {order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.orderItems_container}>
              <h3>Your Order Items</h3>
              {order &&
                order.orderItems?.map((item) => (
                  <div className={styles.orderItem} key={item.product}>
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
                      <input
                        type="number"
                        className="lato_400"
                        value={item.quantity}
                        readOnly
                      />
                    </div>
                    <div className={styles.total}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
