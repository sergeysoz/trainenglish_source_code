import React, { useEffect, useRef, useState } from "react";
import parrot from "./parrot.webp";
import styles from "./Illustration.module.css";
import {
  addToHashCustom,
  isInHash,
  readFromHash,
} from "../../auxiliaries/hash";

export default function Illustration() {
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (!isInHash("illustration-start-page")) {
      fetch(parrot)
        .then((response) => response.blob())
        .then((blob) => {
          setImage(URL.createObjectURL(blob));
          addToHashCustom("illustration-start-page", URL.createObjectURL(blob));
        });
      return;
    }
    setImage(readFromHash("illustration-start-page"));
    return;
  }, []);
  return (
    <div className={styles.illustration_box}>
      <img className={styles.illustration} src={image} alt="Parrot" />
    </div>
  );
}
