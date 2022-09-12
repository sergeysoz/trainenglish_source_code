import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getIcon from "../../auxiliaries/icons";
import Button from "../../componenets/button/Button";
import Layout from "../../componenets/layout/Layout";
import {
  deleteSelectedWords,
  selectSavedWords,
  selectSavedWordsCount,
  selectSelectedWords,
  selectWord,
  setDrillCompleteStatus,
} from "./trainSlice";
import styles from "./Train.module.css";
import Map from "../../componenets/constructs/Map";
import Section from "../../componenets/section/Section";
import Placeholder from "../../componenets/section/Placeholder";
import { subset } from "../../auxiliaries/sets";

export default function Train() {
  const savedWords = useSelector(selectSavedWords);
  const selectedWords = useSelector(selectSelectedWords);
  const savedWordsCount = useSelector(selectSavedWordsCount);
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title =
      "Train - audio, meanings, trainings | TrainEnglish Dictionary at TrainEnglish.ru";
  }, []);
  return (
    <Layout>
      {savedWordsCount > 0 && (
        <Section
          title="Train"
          link={{
            text: "Lets get drilled the word list.",
            href: "/drill-section",
          }}
          text={`${savedWordsCount} ${
            savedWordsCount !== 1 ? "words have" : "word has"
          } saved.`}
        />
      )}

      {savedWordsCount === 0 && (
        <Placeholder text="Do use the search for adding words to the list." />
      )}

      {savedWordsCount !== 0 && (
        <>
          <div className={styles.train_settings_box}>
            {savedWordsCount !== 0 && (
              <Button
                icon={getIcon("settings")}
                callback={
                  savedWordsCount ? () => setIsEditable(!isEditable) : () => {}
                }
              />
            )}
            {selectedWords.length > 0 && isEditable && (
              <Button
                icon={getIcon("trash")}
                callback={() => {
                  dispatch(setDrillCompleteStatus(false));
                  dispatch(deleteSelectedWords());
                  setIsEditable(false);
                }}
              />
            )}
          </div>
          <div className={styles.train_saved_grid}>
            <Map
              data={savedWords}
              renderItem={(item) => (
                <div className={styles.train_saved_item}>
                  {isEditable && (
                    <input
                      checked={
                        subset(selectedWords, item).length ? true : false
                      }
                      onChange={() => {
                        dispatch(selectWord(item));
                      }}
                      type="checkbox"
                    />
                  )}
                  <Link to={`/${item}`}>{item}</Link>
                </div>
              )}
            />
          </div>
        </>
      )}
    </Layout>
  );
}
