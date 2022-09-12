import React from "react";
import styles from "./Container.module.css";

export default function GridContainer({ children }) {
  return <div className={styles.grid_container}>{children}</div>;
}
