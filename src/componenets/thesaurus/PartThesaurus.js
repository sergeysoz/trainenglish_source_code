import React from "react";
import { Link } from "react-router-dom";
import Map from "../constructs/Map";
import styles from "./Thesaurus.module.css";

export default function PartThesaurus({
  thesaurusArray,
  synonym = false,
  partOfSpeech,
  word,
}) {
  return (
    <div className={styles.part_thesaurus_box}>
      <h1>
        {synonym ? "Synontms" : "Antonyms"} for
        <span>{" " + word + ", "}</span>
        {partOfSpeech}
      </h1>
      <Map
        data={thesaurusArray}
        renderItem={(item) => <Link to={`/${item}`}>{item}</Link>}
      />
    </div>
  );
}
