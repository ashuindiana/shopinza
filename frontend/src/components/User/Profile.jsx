import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";
import styles from "./profile.module.css";

const Profile = () => {
  let navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Notification notify={notify} setNotify={setNotify} />
          <div className={`josefin_sans_400 ${styles.header}`}>My Profile</div>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <div className={styles.left}>
                <img src={user.avatar.url} alt="Profile" />
                <Link to="/me/update">Edit Profile</Link>
              </div>
              <div className={styles.right}>
                <div className={`josefin_sans_400 ${styles.info}`}>
                  <span>Name: </span>
                  <span>{user.name}</span>
                </div>
                <div className={`josefin_sans_400 ${styles.info}`}>
                  <span>Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className={`josefin_sans_400 ${styles.info}`}>
                  <span>Joined On: </span>
                  <span>{String(user.createdAt).substring(0, 10)}</span>
                </div>
                <div className={styles.actions}>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
