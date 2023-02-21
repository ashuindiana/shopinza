import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { motion, AnimatePresence } from "framer-motion";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import { Link } from "react-router-dom";
import styles from "./loginSignUp.module.css";
import defaultAvatar from "../../assets/default-profile-pic.jpeg";

function LoginSignUp() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const tabs = ["Login", "SignUp"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  let redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      setNotify({
        isOpen: true,
        message: error,
        type: "error",
      });
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [error, dispatch, isAuthenticated, navigate, redirect]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(defaultAvatar);
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Notification notify={notify} setNotify={setNotify} />
          <div className={`josefin_sans_400 ${styles.header}`}>
            Login / SignUp
          </div>
          <div className={styles.wrapper}>
            <div className={styles.content}>
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
                      <form className={styles.loginForm} onSubmit={loginSubmit}>
                        <div className={styles.loginInput}>
                          <MailOutlinedIcon />
                          <input
                            type="email"
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </div>
                        <div className={styles.loginInput}>
                          <LockOpenOutlinedIcon />
                          <input
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                        </div>
                        <Link to="/password/forgot">Forget Password ?</Link>
                        <input
                          type="submit"
                          value="Login"
                          className={styles.loginBtn}
                        />
                      </form>
                    ) : (
                      <form
                        className={styles.signupForm}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                      >
                        <div className={styles.signupInput}>
                          <MoodOutlinedIcon />
                          <input
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={registerDataChange}
                          />
                        </div>
                        <div className={styles.signupInput}>
                          <MailOutlinedIcon />
                          <input
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={registerDataChange}
                          />
                        </div>
                        <div className={styles.signupInput}>
                          <LockOpenOutlinedIcon />
                          <input
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={password}
                            onChange={registerDataChange}
                          />
                        </div>

                        <div className={styles.registerImage}>
                          <img src={avatarPreview} alt="Profile Preview" />
                          <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Register"
                          className={styles.signupBtn}
                        />
                      </form>
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

export default LoginSignUp;
