import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import styles from "./orderSuccess.module.css";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Order Completed</div>
      <div className={styles.content}>
        <CheckCircleOutlineIcon />
        <div className={styles.text}>Your Order Is Completed!</div>
        <Link to="/orders">View Orders</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
