import React from "react";
import styles from "./Button.module.css";

export default function ButtonStrioke({ name = "", callback = () => {} }) {
  return (
    <button
      className={styles.button_stroke}
      onClick={() => callback()}
      type="button"
    >
      {name}
    </button>
  );
}
