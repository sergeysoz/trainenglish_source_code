import React from "react";
import getIcon from "../../auxiliaries/icons";
import Button from "../button/Button";
import styles from "./Phonetic.module.css";

export default function Phonetic({ text = "", audio = null }) {
  const sound = new Audio(audio);
  return (
    <div className={styles.phonetic_box}>
      <p className={styles.phonetic_text}>{text}</p>
      <Button
        icon={getIcon("playFilled")}
        callback={() => {
          if (sound.readyState >= 2) {
            sound
              .play()
              .then(() => {})
              .catch((error) => console.error(error));
            return;
          }
        }}
      />
    </div>
  );
}
