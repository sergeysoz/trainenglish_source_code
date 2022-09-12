import React from "react";
import { Link } from "react-router-dom";
import GitHubButton from "../button/GitHubButton";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_nav}>
        <Link to="/about-section">About</Link>
        <Link to="/">To Start</Link>
      </div>
      <div className={styles.alias}>
        <p>Developed by Sergey Sozontov</p>
        <GitHubButton />
      </div>
    </div>
  );
}
