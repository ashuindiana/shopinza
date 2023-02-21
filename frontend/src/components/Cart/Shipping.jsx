import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Notification from "../Notification/Notification";
import styles from "./shipping.module.css";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { saveShippingInfo } from "../../actions/cartActions";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate, Link } from "react-router-dom";

const Shipping = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippIngCharges = totalPrice > 500 ? 0 : 40;

  const tax = totalPrice * 0.18;

  const grandTotal = totalPrice + tax + shippIngCharges;

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      setNotify({
        isOpen: true,
        message: "Phone number format is not correct",
        type: "error",
      });
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    const orderData = {
      totalPrice,
      shippIngCharges,
      tax,
      grandTotal,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(orderData));
    navigate("/process/payment");
  };

  return (
    <div className={styles.container}>
      <Notification notify={notify} setNotify={setNotify} />
      <CheckoutSteps activeStep={0} />
      <div className={styles.content}>
        <div className={styles.form}>
          <form
            className={styles.shippingForm}
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className={styles.shippingInput}>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className={styles.shippingInput}>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className={styles.shippingInput}>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className={styles.shippingInput}>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div className={styles.shippingInput}>
              <PublicIcon />
              <CountryDropdown
                valueType="short"
                value={country}
                onChange={(val) => setCountry(val)}
              />
            </div>
            <div className={styles.shippingInput}>
              <TransferWithinAStationIcon />
              <RegionDropdown
                countryValueType="short"
                blankOptionLabel="Select a country first"
                country={country}
                value={state}
                onChange={(val) => setState(val)}
              />
            </div>

            <input
              type="submit"
              value="Proceed to payment"
              className={styles.shippingBtn}
            />
          </form>
        </div>
        <div className={styles.details}>
          <div className={styles.up}>
            <div className={`josefin_sans_700 ${styles.details_header}`}>
              <div>Order Summary</div>
              <div>Subtotal</div>
            </div>
            <div className={styles.cartItems_container}>
              {cartItems &&
                cartItems.map((item) => (
                  <div className={styles.cartItem} key={item.product}>
                    <div className={styles.product}>
                      <img src={item.image} alt="cart product" />
                      <div className={styles.info}>
                        <Link to={`/product/${item.product}`}>
                          <h3 className="josefin_sans_400">{item.name}</h3>
                        </Link>
                        <div className={`lato_400 ${styles.item_info}`}>
                          ₹{item.price}
                        </div>
                        <div className={`lato_400 ${styles.item_info}`}>
                          x{item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className={styles.price_container}>
                      <div className={`lato_400 $styles.price}`}>
                        ₹{item.quantity * item.price}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.totals_container}>
            <div className={styles.total_price}>
              <div className="lato_700">Total:</div>
              <div className="lato_400">₹{totalPrice}</div>
            </div>
            <div className={styles.total_price}>
              <div className="lato_700">Shipping Charges:</div>
              <div className="lato_400">₹{shippIngCharges}</div>
            </div>
            <div className={styles.total_price}>
              <div className="lato_700">Tax:</div>
              <div className="lato_400">₹{tax}</div>
            </div>
            <div className={styles.total_price}>
              <div className="lato_700">Grand Total:</div>
              <div className="lato_400">₹{grandTotal}</div>
            </div>
            {/* <button>Proceed to payment</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
