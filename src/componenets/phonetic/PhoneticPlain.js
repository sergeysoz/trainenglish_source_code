import React from "react";
import styles from "./Phonetic.module.css";

export default function PhoneticPlain({ text }) {
  return (
    <div className={styles.phonetic_box}>
      <p className={styles.phonetic_text}>{text}</p>
    </div>
  );
}
