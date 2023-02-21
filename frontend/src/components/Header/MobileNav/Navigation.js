import * as React from "react";
import { motion } from "framer-motion";
import { MenuLink } from "./MenuLink";
import styles from "./MobileNavigation.module.css";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const variants2 = {
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

export const Navigation = ({ toggle }) => {
  const [showMenuCategories, setShowMenuCategories] = React.useState(false);

  return (
    <>
      {showMenuCategories ? (
        <motion.ul variants={variants} className={styles.menu_ul}>
          <MenuLink
            text="More"
            goBackIcon
            onClick={() => {
              setShowMenuCategories(false);
            }}
            width="60%"
          />
          <MenuLink
            text="Item #1"
            onClick={() => {
              setShowMenuCategories(false);
              toggle();
            }}
          />
          <MenuLink
            text="Item #2"
            onClick={() => {
              setShowMenuCategories(false);
              toggle();
            }}
          />
          <MenuLink
            text="Item #3"
            onClick={() => {
              setShowMenuCategories(false);
              toggle();
            }}
          />
          <MenuLink
            text="Item #4"
            onClick={() => {
              setShowMenuCategories(false);
              toggle();
            }}
          />
          <motion.hr variants={variants2} />
        </motion.ul>
      ) : (
        <motion.ul variants={variants} className={styles.menu_ul}>
          <MenuLink text="Home" path="/" onClick={() => toggle()} />
          <MenuLink text="Products" path="/products" onClick={() => toggle()} />
          <MenuLink text="About Us" path="/about" onClick={() => toggle()} />
          <MenuLink
            text="Contact Us"
            path="/contact"
            onClick={() => toggle()}
          />
          <MenuLink
            text="More"
            icon
            onClick={() => setShowMenuCategories(true)}
          />
          <motion.hr variants={variants2} />
        </motion.ul>
      )}
    </>
  );
};
