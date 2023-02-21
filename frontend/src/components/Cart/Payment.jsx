import React, { useState, useEffect, useRef } from "react";
import styles from "./payment.module.css";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import Notification from "../Notification/Notification";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderActions";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const paymentData = {
    amount: Math.round(orderInfo.grandTotal * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.totalPrice,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.grandTotal,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        setNotify({
          isOpen: true,
          message: result.error.message,
          type: "error",
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          setNotify({
            isOpen: true,
            message: "Order Placed",
            type: "success",
          });

          navigate("/success");
        } else {
          setNotify({
            isOpen: true,
            message: "There's some issue while processing payment ",
            type: "error",
          });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      setNotify({
        isOpen: true,
        message: error.response.data.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (error) {
      setNotify({
        isOpen: true,
        message: error,
        type: "error",
      });
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <div className={styles.container}>
      <Notification notify={notify} setNotify={setNotify} />
      <CheckoutSteps activeStep={1} />
      <div className={styles.content}>
        <form className={styles.paymentForm} onSubmit={(e) => submitHandler(e)}>
          <p className="josefin_sans_700">Card Info</p>
          <div className={styles.paymentInputDiv}>
            <CreditCardIcon />
            <CardNumberElement className={styles.paymentInput} />
          </div>
          <div className={styles.paymentInputDiv}>
            <EventIcon />
            <CardExpiryElement className={styles.paymentInput} />
          </div>
          <div className={styles.paymentInputDiv}>
            <VpnKeyIcon />
            <CardCvcElement className={styles.paymentInput} />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.grandTotal}`}
            ref={payBtn}
            className={styles.paymentFormBtn}
          />
        </form>
      </div>
    </div>
  );
};

export default Payment;
