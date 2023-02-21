import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import styles from "./MobileNavigation.module.css";
import header_styles from "../Header.module.css";

const sidebar = {
  open: (height = 1000) => ({
    background: "#f2f0ff",
    clipPath: `circle(1502px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 60,
      restDelta: 2,
    },
  }),
  closed: {
    background: "white",
    clipPath: "circle(25px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const MobileNavigation = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={`${styles.nav_mobile} ${header_styles.nav_mobile}`}
      variants={sidebar}
    >
      <motion.div className={styles.background} variants={sidebar} />
      <Navigation toggle={() => toggleOpen()} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
