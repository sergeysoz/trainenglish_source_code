import React from "react";
import styles from "./Button.module.css";

export default function StartButton({ callback = () => {} }) {
  return (
    <button
      onClick={() => callback()}
      className={styles.start_button}
      type="button"
    >
      Start
    </button>
  );
}
