import React from "react";
import sofa_promo from "../../../assets/sofa.png";
import lamp from "../../../assets/lamp.png";
import styles from "./Promotion.module.css";

function Promotion() {
  return (
    <div className={styles.container}>
      <div className={styles.side_img}>
        <img src={lamp} alt="lamp" />
      </div>
      <div className={styles.header_text}>
        <div className={styles.upper_title}>
          Best Furniture For Your Castle....
        </div>
        <div className={styles.main_text}>New Furniture Collection</div>
        <div className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est
          adipiscing in phasellus non in justo.
        </div>
        <div className={styles.shop_btn}>
          <button>Shop now</button>
        </div>
      </div>
      <div className={styles.promo_img}>
        <img src={sofa_promo} alt="sofa" />
      </div>
    </div>
  );
}

export default Promotion;
