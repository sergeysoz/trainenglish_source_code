import React from "react";
import { useSelector } from "react-redux";
import getIcon from "../../auxiliaries/icons";
import { subset } from "../../auxiliaries/sets";
import { selectSavedWords } from "../../features/train/trainSlice";
import styles from "./Button.module.css";

export default function SaveButton({ word = "", callback = () => {} }) {
  const savedWords = useSelector(selectSavedWords);
  const isSaved = subset(savedWords, word).length ? true : false;
  const icon = isSaved ? getIcon("bookmarkFilled") : getIcon("bookmark");
  return (
    <>
      <button
        className={styles.save_button}
        type="button"
        onClick={() => callback()}
      >
        {icon}
      </button>
      {isSaved ? (
        <p className={styles.save_label}>The word has saved</p>
      ) : (
        <p className={styles.save_label}>Save word</p>
      )}
    </>
  );
}
