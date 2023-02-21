import React, { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid/ProductGrid";
import ImgSlider from "./Promotion_carousel/ImgSlider";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import Notification from "../Notification/Notification";

function Home() {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      setNotify({
        isOpen: true,
        message: error,
        type: "error",
      });
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <ImgSlider />
          <Notification notify={notify} setNotify={setNotify} />
          <ProductGrid products={products} />
        </div>
      )}
    </>
  );
}

export default Home;
