import React from "react";
import styles from "./Part.module.css";

export default function Part({ partOfSpeech, children }) {
  return (
    <div className={styles.part_box}>
      <h3 className={styles.part_of_speech}>{partOfSpeech}</h3>
      {children}
    </div>
  );
}
