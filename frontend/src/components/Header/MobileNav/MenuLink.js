import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import styles from "./MobileNavigation.module.css";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuLink = ({ text, path, icon, goBackIcon, onClick, width }) => {
  return (
    <>
      <Link to={`${path ? path : "#"}`}>
        <motion.li
          style={{ width }}
          onClick={onClick}
          variants={variants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.95 }}
          className={styles.menuList}
        >
          {goBackIcon && <ChevronLeftRoundedIcon fontSize="medium" />}
          {text}
          {icon && <ChevronRightRoundedIcon fontSize="medium" />}
        </motion.li>
      </Link>
    </>
  );
};
