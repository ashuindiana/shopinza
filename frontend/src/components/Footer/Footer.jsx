import React from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={`${styles.general} ${styles.footer_group}`}>
          <div className={styles.title}>Shopinza</div>
          <div className={styles.signup}>
            <input type="email" placeholder="Enter your email" />
            <button>Sign Up</button>
          </div>
          <div className={styles.contact}>
            Contact Info <br /> 17 Princess Road, London, Greater London NW1
            8JR, UK
          </div>
        </div>
        <div className={`${styles.categories} ${styles.footer_group}`}>
          <div className={styles.title}>Categories</div>
          <div className={styles.footer_item}>Laptops & Computers</div>
          <div className={styles.footer_item}>Cameras & Photography</div>
          <div className={styles.footer_item}>Smart Phones & Tablets</div>
          <div className={styles.footer_item}>Video Games & Consoles</div>
          <div className={styles.footer_item}>Waterproof Headphones</div>
        </div>
        <div className={`${styles.customer} ${styles.footer_group}`}>
          <div className={styles.title}>Customer Care</div>
          <div className={styles.footer_item}>My Account</div>
          <div className={styles.footer_item}>Discount</div>
          <div className={styles.footer_item}>Returns</div>
          <div className={styles.footer_item}>Orders History</div>
          <div className={styles.footer_item}>Order Tracking</div>
        </div>
      </div>
      <div className={styles.lower}>
        <div className={styles.copyright}>©Shopinza - All Rights Reserved</div>
        <div className={styles.social}>
          <FacebookRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default Footer;
