import React from "react";
import styles from "./Button.module.css";

export default function CancelButton({ callback }) {
  return (
    <button
      className={styles.cancel_button}
      onClick={() => callback()}
      type="button"
    >
      Cancel
    </button>
  );
}
