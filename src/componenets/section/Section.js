import React from "react";
import { Link } from "react-router-dom";
import styles from "./Section.module.css";

export default function Section({ title, text, link = null }) {
  return (
    <div className={styles.section_box}>
      <h1>{title}</h1>
      <p>
        {text + " "}
        <Link to={link.href}>{link.text}</Link>
      </p>
    </div>
  );
}
