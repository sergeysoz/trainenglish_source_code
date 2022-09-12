import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./History.module.css";
import ButtonStrioke from "../button/ButtonStroke";

export default function History() {
  const navigate = useNavigate();
  return (
    <div className={styles.history_row}>
      <ButtonStrioke name="Prev" callback={() => navigate(-1)} />
      <ButtonStrioke name="Next" callback={() => navigate(+1)} />
    </div>
  );
}
