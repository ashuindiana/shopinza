import React, { useState, useEffect } from "react";
import styles from "./productDetails.module.css";
import { useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import Notification from "../Notification/Notification";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Rating } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ReviewCard from "./ReviewCard";
import { useMediaQuery } from "../../utils/mediaQueryHook";
import { addItemsToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

function ProductDetails() {
  const match = useMatch("/product/:id");
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (error) {
      setNotify({
        isOpen: true,
        message: error,
        type: "error",
      });
      dispatch(clearErrors());
    }

    if (reviewError) {
      setNotify({
        isOpen: true,
        message: reviewError,
        type: "error",
      });
      dispatch(clearErrors());
    }

    if (success) {
      setNotify({
        isOpen: true,
        message: "Review Submitted Successfully",
        type: "success",
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, error, match.params.id, success, reviewError]);

  const tabs = ["Description", "Reviews"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const isTablet = useMediaQuery("(max-width: 768px)");

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    if (product.stock < 1) {
      setNotify({
        isOpen: true,
        message: "Item currently out of stock",
        type: "error",
      });
      return;
    }
    dispatch(addItemsToCart(match.params.id, quantity));
    setNotify({
      isOpen: true,
      message: "Item added to Cart",
      type: "success",
    });
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Notification notify={notify} setNotify={setNotify} />
          <div className={`josefin_sans_400 ${styles.product_details_header}`}>
            Product Details
          </div>
          <div className={styles.product_details_wrapper}>
            <div className={styles.details_container}>
              <div className={styles.carousel}>
                <Carousel
                  showArrows={true}
                  autoPlay={true}
                  infiniteLoop={true}
                  showThumbs={!isTablet}
                >
                  {product.images &&
                    product.images.map((image) => (
                      <img
                        src={image.url}
                        key={image.url}
                        className={styles.carousel_image}
                        alt={product.name}
                      />
                    ))}
                </Carousel>
              </div>
              <div className={styles.product_details}>
                <div className={`${styles.name} josefin_sans_400`}>
                  {product.name}
                </div>
                <div className={styles.rating}>
                  <Rating value={product.rating} precision={0.5} readOnly />
                  <span className={`lato_400 ${styles.text}`}>
                    ({product.noOfReviews})
                  </span>
                </div>
                <div className={`${styles.price} josefin_sans_400`}>
                  ₹{product.price}
                </div>
                <div className={styles.add_to_cart}>
                  <button onClick={increaseQuantity}>+</button>
                  <input
                    type="number"
                    name="productCount"
                    className="lato_400"
                    value={quantity}
                    readOnly
                  />
                  <button onClick={decreaseQuantity}>-</button>
                  <FavoriteBorderRoundedIcon onClick={addToCartHandler} />
                </div>
                <div
                  className={` josefin_sans_400 ${
                    product.stock > 0 ? styles.in_status : styles.out_status
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of stock"}
                </div>
                <div className={styles.submitReviewBtn}>
                  <button onClick={submitReviewToggle}>Submit Review</button>
                </div>
                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className={styles.submitDialog}>
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                    />

                    <textarea
                      className={styles.submitDialogTextArea}
                      cols="30"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={submitReviewToggle}
                      className="redColour_dark"
                      sx={{ fontWeight: "550" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={reviewSubmitHandler}
                      className="greenColour_dark"
                      sx={{ fontWeight: "550" }}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
          <div className={styles.switcher}>
            <div className={styles.switcher_wrapper}>
              <nav>
                <ul>
                  {tabs.map((item) => (
                    <li
                      key={item}
                      className={`${
                        item === selectedTab ? styles.selectedTab : ""
                      } josefin_sans_400`}
                      onClick={() => setSelectedTab(item)}
                    >
                      {item}
                      {item === selectedTab ? (
                        <motion.div
                          className={styles.underline}
                          layoutId="underline"
                        />
                      ) : null}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className={styles.switcher_content}>
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    key={selectedTab ? selectedTab : "empty"}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.15 }}
                  >
                    {selectedTab === tabs[0] ? (
                      <div className={styles.desc}> {product.description}</div>
                    ) : product.reviews.length ? (
                      product.reviews.map((review) => (
                        <ReviewCard review={review} />
                      ))
                    ) : (
                      <div className={styles.desc}> No reviews yet</div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
