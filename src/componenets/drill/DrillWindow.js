import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readFromHash } from "../../auxiliaries/hash";
import getIcon from "../../auxiliaries/icons";
import getRandomInt from "../../auxiliaries/random";
import {
  selectCorrectStatus,
  selectDrilledWord,
  selectDrillStep,
  selectSavedWordsCount,
  selectStatus,
  setCorrectStatus,
  setStatus,
  successCorrectAnswerStep,
} from "../../features/train/trainSlice";
import CancelButton from "../button/CancelButton";
import CircleTimerAuto from "../timer/CircleTimerAuto";
import styles from "./Drill.module.css";
import harp from "./harp.mp3";

export default function DrillWindow({ callback }) {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const drilledWord = useSelector(selectDrilledWord);
  const savedWordsCount = useSelector(selectSavedWordsCount);
  const drillStep = useSelector(selectDrillStep);
  const correctStatus = useSelector(selectCorrectStatus);
  const inputRef = useRef();
  const answerRef = useRef("");
  const currentDrillEntry = readFromHash(drilledWord);
  const correctAnswer = new Audio(harp);

  const currentMeaning = currentDrillEntry?.meanings[
    getRandomInt(currentDrillEntry.meanings.length)
  ] || { definitions: [{ definition: "" }] };
  useEffect(() => {
    if (status === "pending") inputRef.current.focus();
  }, [status]);
  const go = () => {
    if (answerRef.current.toLocaleLowerCase() === drilledWord) {
      correctAnswer.play();
      dispatch(successCorrectAnswerStep());
      dispatch(setCorrectStatus(true));
      return dispatch(setStatus("paused"));
    }
    inputRef.current.value = "";
  };
  return (
    <div className={styles.popup}>
      <div>
        <div className={styles.indicator_box}>
          <h1 className={styles.drill_steps}>
            Step: {drillStep + 1} &frasl; {savedWordsCount}
          </h1>
          <CircleTimerAuto />
        </div>
        {status === "pending" && (
          <div className={styles.drill_input_box}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                go();
              }}
            >
              <input
                className={styles.drill_input}
                onChange={({ target }) => (answerRef.current = target.value)}
                onKeyDown={({ code }) => {
                  if (code === "Enter") go();
                  return;
                }}
                ref={inputRef}
                type="text"
                placeholder="Type Your Answer"
              />
            </form>
          </div>
        )}
        {status === "paused" && (
          <div className={styles.drill_input_box}>
            <input
              className={styles.drill_input}
              type="text"
              placeholder="Paused"
              disabled
            />
          </div>
        )}

        {status === "paused" && (
          <div className={styles.answer}>
            <span>
              {correctStatus
                ? getIcon(
                    ["laughing", "heartEyes", "sunglasses"][getRandomInt(3)]
                  )
                : getIcon(["frown", "dizzy", "angry"][getRandomInt(3)])}
            </span>
            <p>{currentDrillEntry.word}</p>
          </div>
        )}

        {status === "pending" && (
          <div className={styles.question_box}>
            <div className={styles.drill_definition}>
              <p>{currentMeaning.definitions[0].definition}</p>
            </div>
            <div className={styles.drill_part_of_speech}>
              <p>{currentMeaning.partOfSpeech}</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.drill_footer}>
        <CancelButton callback={callback} />
      </div>
    </div>
  );
}
