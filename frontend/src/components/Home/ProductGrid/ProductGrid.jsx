import React from "react";
import ProductCard from "./ProductCard";
import styles from "./productgrid.module.css";

function ProductGrid({ products }) {
  return (
    <div className={styles.container}>
      <div className={`josefin_sans_400 ${styles.title}`}>
        Featured Products
      </div>
      <div className={styles.product_grid}>
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
}

export default ProductGrid;
