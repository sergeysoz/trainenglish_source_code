import React from "react";
import styles from "./Drill.module.css";

export default function Score({ correctAnswers, savedWords }) {
  const scorePercents = Math.ceil((correctAnswers / savedWords) * 100);
  return (
    <div className={styles.drill_score_box}>
      <h1>Your Current Score:</h1>
      <div className={styles.drill_score_grid}>
        <p>Correct Answers:</p>
        <span>{correctAnswers}</span>
        <p>Words Total:</p>
        <span>{savedWords}</span>
        <p>Your Score:</p>
        <span>{scorePercents}%</span>
      </div>
    </div>
  );
}
