import React from "react";
import getIcon from "../../auxiliaries/icons";
import styles from "./Button.module.css";

export default function GitHubButton() {
  return (
    <span className={styles.github_button}>
      <a href="https://github.com/sergeysoz">{getIcon("github")}</a>
    </span>
  );
}
