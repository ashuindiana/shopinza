import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useNavigate, useMatch } from "react-router-dom";
import Notification from "../Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import styles from "./resetPassword.module.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const match = useMatch("/password/reset/:token");

  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
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
    if (success) {
      setNotify({
        isOpen: true,
        message: "Password Updated Successfully",
        type: "success",
      });
      navigate("/account");
    }
  }, [error, dispatch, success, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Notification notify={notify} setNotify={setNotify} />
          <div className={`josefin_sans_400 ${styles.header}`}>
            Change Password
          </div>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <form
                className={styles.resetPasswordForm}
                onSubmit={resetPasswordSubmit}
              >
                <div className={styles.resetPasswordInput}>
                  <LockOpenOutlinedIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={styles.resetPasswordInput}>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className={styles.resetPasswordBtn}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
