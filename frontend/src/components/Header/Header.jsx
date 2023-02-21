import React, { useState } from "react";
import Notification from "../Notification/Notification";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { MobileNavigation } from "./MobileNav/MobileNavigation";

function Header({ user }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const [keyword, setKeyword] = useState();

  const submitSearchHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleDashboard = () => {
    navigate("/admin/dashboard");
  };

  const handleAccount = () => {
    navigate("/account");
  };

  const handleOrder = () => {
    navigate("/orders");
  };

  const handleLogout = () => {
    dispatch(logout());
    setNotify({
      isOpen: true,
      message: "Logout Successfull",
      type: "success",
    });
  };

  return (
    <div className={styles.container}>
      <Notification notify={notify} setNotify={setNotify} />
      <div className={styles.inner_container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/" className="josefin_sans_700">
            Shopinza
          </Link>
        </div>

        {/* Nav Items --> Products, Contact, About,  */}
        <ul className={styles.navBar}>
          <Link to="/products" className="lato_400">
            Products
          </Link>
          <Link to="/about" className="lato_400">
            About Us
          </Link>
          <Link to="/contact" className="lato_400">
            Contact Us
          </Link>
        </ul>

        <MobileNavigation />

        {/* Search Bar */}
        <form className={styles.searchBar} onSubmit={submitSearchHandler}>
          <input
            type="text"
            className={styles.search_input}
            placeholder="Search.."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchIcon
            className={styles.search_icon}
            onClick={submitSearchHandler}
          />
        </form>

        <div className={styles.user_details}>
          {/* Account */}
          <>
            {user?.avatar?.url ? (
              <div className={styles.account}>
                <img
                  src={user.avatar.url}
                  alt="Profile"
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                />
                <span className={`lato_400 ${styles.userName}`}>
                  {user.name}
                </span>
              </div>
            ) : (
              <Link to="/login" className={styles.account}>
                <PersonIcon />
                <span className={`lato_400 ${styles.userName}`}>Login</span>
              </Link>
            )}
          </>

          {/* Profile Menu */}

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {user?.role === "admin" && (
              <MenuItem onClick={handleDashboard}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                Dashboard
              </MenuItem>
            )}
            <MenuItem onClick={handleAccount}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              My account
            </MenuItem>
            <MenuItem onClick={handleOrder}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              My Orders
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

          {/* Cart */}
          <Link className={styles.cart} to="/cart">
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
