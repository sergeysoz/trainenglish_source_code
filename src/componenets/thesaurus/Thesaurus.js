import React from "react";
import { Link } from "react-router-dom";
import Map from "../constructs/Map";
import styles from "./Thesaurus.module.css";

export default function Thesaurus({ thesaurusArray, synonym = false, word }) {
  return (
    <div className={styles.thesaurus_box}>
      <h1>
        {synonym ? "Synonyms" : "Antonyms"} for
        <span>{" " + word + " "}</span>in the definition
      </h1>
      <Map
        data={thesaurusArray}
        renderItem={(item) => <Link to={`/${item}`}>{item}</Link>}
      />
    </div>
  );
}
