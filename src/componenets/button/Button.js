import React from "react";
import styles from "./Button.module.css";

export default function Button({ icon = "", callback = () => {} }) {
  return (
    <button
      className={styles.round_button}
      type="button"
      onClick={() => callback()}
    >
      {icon}
    </button>
  );
}
