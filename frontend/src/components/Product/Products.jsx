import React, { useEffect, useState } from "react";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import styles from "./products.module.css";
import { useMatch } from "react-router-dom";
import ProductCard from "../Home/ProductGrid/ProductCard";
import Pagination from "@mui/material/Pagination";
import Slider from "@mui/material/Slider";
import Notification from "../Notification/Notification";
import Radio from "@mui/material/Radio";
import { Rating } from "@mui/material";

const categories = [
  "Laptop",
  "Shoes",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Mobiles",
];

const Products = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const priceChangeHandler = (event, value) => {
    setPrice(value);
  };

  const handlePageChange = (event, value) => {
    setCurrPage(value);
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const match = useMatch("/products/:keyword");

  useEffect(() => {
    if (error) {
      setNotify({
        isOpen: true,
        message: error,
        type: "error",
      });
      dispatch(clearErrors());
    }
    dispatch(
      getProducts(match?.params.keyword, currPage, price, category, rating)
    );
  }, [
    dispatch,
    match?.params.keyword,
    currPage,
    price,
    error,
    category,
    rating,
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Notification notify={notify} setNotify={setNotify} />
          <div className={`josefin_sans_400 ${styles.header}`}>Products</div>
          <div className={styles.main_body}>
            <div className={styles.upper_body}>
              <div className={styles.filterBox}>
                <h3 className={`josefin_sans_400 ${styles.filter_title}`}>
                  Price Filter
                </h3>
                <Slider
                  value={price}
                  onChange={priceChangeHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={50000}
                  size="small"
                  sx={{ width: "65%" }}
                />
                <h3 className={`josefin_sans_400 ${styles.filter_title}`}>
                  Categories
                </h3>
                <ul className={styles.categoryBox}>
                  {categories.map((categ) => (
                    <li className={styles.category_link}>
                      <Radio
                        checked={category === categ}
                        key={categ}
                        value={categ}
                        onClick={(e) => {
                          if (e.target.value === category) {
                            setCategory("");
                          } else {
                            setCategory(categ);
                          }
                        }}
                        sx={{
                          color: "#FFDBF1",
                          "&.Mui-checked": {
                            color: "#FF3EB2",
                          },
                        }}
                        size="small"
                      />
                      <span className={`lato_400 ${styles.category_text}`}>
                        {categ}
                      </span>
                    </li>
                  ))}
                </ul>
                <h3 className={`josefin_sans_400 ${styles.filter_title}`}>
                  Ratings Above
                </h3>
                <ul>
                  {Array(5)
                    .fill()
                    .map((_, idx) => (
                      <li className={styles.rating_link}>
                        <Radio
                          checked={rating === idx + 1}
                          key={idx}
                          value={idx + 1}
                          onClick={(e) => {
                            if (e.target.value == rating) {
                              setRating(0);
                            } else {
                              setRating(idx + 1);
                            }
                          }}
                          sx={{
                            color: "#f0e3bb",
                            "&.Mui-checked": {
                              color: "#FFCC2E",
                            },
                          }}
                          size="small"
                        />
                        <Rating
                          defaultValue={idx + 1}
                          precision={1}
                          readOnly
                          size="small"
                        />
                      </li>
                    ))}
                </ul>
              </div>
              <div className={styles.products}>
                {products &&
                  products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
              </div>
            </div>
            {resultsPerPage < filteredProductsCount && (
              <div className={styles.pagination}>
                <Pagination
                  count={Math.ceil(productsCount / resultsPerPage)}
                  page={currPage}
                  onChange={handlePageChange}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      "&:hover": {
                        background: "#FB2E86",
                      },
                      "&.Mui-selected": {
                        background: "#FB2E86",
                        color: "white",
                        "&:hover": {
                          background: "#ed1974",
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
