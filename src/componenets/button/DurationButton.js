import React from "react";
import styles from "./Button.module.css";

export default function DurationButton({
  duration = 0,
  isActive = false,
  callback = () => {},
}) {
  return (
    <button
      className={
        isActive
          ? styles.duration_button + " " + styles.duration_button_active
          : styles.duration_button
      }
      onMouseDown={() => callback()}
      type="button"
    >
      {duration} sec.
    </button>
  );
}
