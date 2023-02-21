import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../actions/userAction";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import styles from "./updatePassword.module.css";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [cnfmPwd, setCnfmPwd] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPwd);
    myForm.set("newPassword", newPwd);
    myForm.set("confirmPassword", cnfmPwd);

    dispatch(updatePassword(myForm));
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
    if (isUpdated) {
      setNotify({
        isOpen: true,
        message: "Profile Updated Successfully",
        type: "success",
      });
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [error, dispatch, isUpdated, navigate]);
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
                className={styles.updatePwdForm}
                onSubmit={updatePasswordSubmit}
              >
                <div className={styles.updatePwdInput}>
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPwd}
                    onChange={(e) => setOldPwd(e.target.value)}
                  />
                </div>
                <div className={styles.updatePwdInput}>
                  <LockOpenOutlinedIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                  />
                </div>
                <div className={styles.updatePwdInput}>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={cnfmPwd}
                    onChange={(e) => setCnfmPwd(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change Password"
                  className={styles.updatePwdBtn}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
