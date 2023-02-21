import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Notification from "../Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import styles from "./forgotPassword.module.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      setNotify({
        isOpen: true,
        message: error,
        type: "error",
      });
      dispatch(clearErrors());
    }
    if (message) {
      setNotify({
        isOpen: true,
        message: message,
        type: "success",
      });
    }
  }, [error, dispatch, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Notification notify={notify} setNotify={setNotify} />
          <div className={`josefin_sans_400 ${styles.header}`}>
            Forgot Password
          </div>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <form
                className={styles.forgotPasswordForm}
                onSubmit={forgotPasswordSubmit}
              >
                <div className={styles.forgotPasswordInput}>
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send Email"
                  className={styles.forgotPasswordBtn}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
