import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import styles from "./productcard.module.css";

function ProductCard({ product }) {
  return (
    <Link className={styles.productCard} to={`/product/${product._id}`}>
      <div className={styles.img_bg}>
        <img src={product.images[0].url} alt={product.name} />
      </div>
      <div className={styles.product_details}>
        <div className={styles.wrapper}>
          <p className="josefin_sans_400">{product.name}</p>
          <span className={`lato_400 ${styles.text}`}>₹ {product.price}</span>
        </div>
        <div className={styles.product_rating}>
          <Rating defaultValue={product.rating} precision={0.5} readOnly />
          <span className={`lato_400 ${styles.text}`}>
            ({product.noOfReviews})
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
