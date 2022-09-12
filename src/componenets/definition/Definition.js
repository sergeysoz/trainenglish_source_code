import React from "react";
import Thesaurus from "../thesaurus/Thesaurus";
import styles from "./Definition.module.css";

export default function Definition({ definition, word, count }) {
  return (
    <div className={styles.definition}>
      <h3>{count + 1}</h3>
      <div>
        <p className={styles.definition_text}>{definition.definition}</p>
        {definition.example && (
          <>
            <p className={styles.definition_example}>{definition.example}</p>
          </>
        )}
        {definition.synonyms.length !== 0 && (
          <Thesaurus word={word} thesaurusArray={definition.synonyms} synonym />
        )}
        {definition.antonyms.length !== 0 && (
          <Thesaurus word={word} thesaurusArray={definition.antonyms} />
        )}
      </div>
    </div>
  );
}
