import React from "react";
import Rating from "@mui/material/Rating";
import styles from "./productDetails.module.css";

function ReviewCard({ review }) {
  return (
    <div className={styles.review_wrapper}>
      <div className={styles.userInfo}>
        <div className={styles.username}>{review.name}</div>
        <div className={styles.rating}>
          <Rating
            value={review.rating}
            precision={0.5}
            readOnly
            sx={{ fontSize: "1rem" }}
          />
        </div>
      </div>
      <div className={styles.comment}>{review.comment}</div>
    </div>
  );
}

export default ReviewCard;
