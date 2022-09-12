import React from "react";
import { Link } from "react-router-dom";
import styles from "./Section.module.css";

export default function Placeholder({ text, link = null }) {
  return (
    <div className={styles.placeholder}>
      <p>
        {text + " "}
        {link !== null && <Link to={link.href}>{link.text}</Link>}
      </p>
    </div>
  );
}
