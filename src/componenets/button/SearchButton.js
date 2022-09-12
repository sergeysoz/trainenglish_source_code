import React from "react";
import getIcon from "../../auxiliaries/icons";
import styles from "./Button.module.css";

export default function SearchButton({ callback = () => {} }) {
  return (
    <button
      className={styles.search_button}
      type="button"
      onClick={() => callback()}
    >
      {getIcon("search")}
    </button>
  );
}
