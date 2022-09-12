import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initDrilledList,
  resetAnswersStep,
  resetDrillStep,
  resetPath,
  selectCorrectAnswerStep,
  selectCurrentDuration,
  selectDrillCompleteStatus,
  selectSavedWordsCount,
  selectStatus,
  setDrillCompleteStatus,
  setDuration,
  setStatus,
} from "../../features/train/trainSlice";
import DurationButton from "../button/DurationButton";
import StartButton from "../button/StartButton";
import Layout from "../layout/Layout";
import styles from "./Drill.module.css";
import StartTimer from "./StartTimer";
import DrillWindow from "./DrillWindow";
import PauseTimer from "./PauseTimer";
import Map from "../constructs/Map";
import Score from "./Score";
import Section from "../section/Section";
import Placeholder from "../section/Placeholder";
import Timers from "./Timers";

export default function Drill() {
  const status = useSelector(selectStatus);
  const currentDuration = useSelector(selectCurrentDuration);
  const dispatch = useDispatch();
  const [isDrillOpen, setIsDrillOpen] = useState(false);
  const drillCompleteStatus = useSelector(selectDrillCompleteStatus);
  const correctAnswersCount = useSelector(selectCorrectAnswerStep);
  const savedWordsCount = useSelector(selectSavedWordsCount);
  const cancelCallback = useCallback(() => {
    dispatch(resetPath());
    dispatch(setStatus("idle"));
    dispatch(resetDrillStep());
    setIsDrillOpen(false);
  }, []);
  const startCallback = useCallback(() => {
    setIsDrillOpen(true);
    dispatch(setDrillCompleteStatus(false));
    dispatch(initDrilledList());
    dispatch(resetAnswersStep());
    dispatch(setStatus("pending"));
  });
  const durations = [
    {
      duration: 5,
      ms: 5040,
    },
    {
      duration: 10,
      ms: 10080,
    },
    {
      duration: 15,
      ms: 15120,
    },
  ];

  useEffect(() => {
    document.title =
      "Drill - audio, meanings, trainings | TrainEnglish Dictionary at TrainEnglish.ru";
  }, []);

  return (
    <Layout>
      {savedWordsCount > 0 && (
        <Section
          title="Drill"
          text={`Choose a convenient time duration and start the drill for ${savedWordsCount} saved ${
            savedWordsCount !== 1 ? "words" : "word"
          }.
        When the drill started just type an answer (a word) and press Enter. When you start a drill your current score will be deleted.`}
          link={{
            text: "You can change the word list at any time.",
            href: "/train-section",
          }}
        />
      )}

      {drillCompleteStatus && (
        <Score
          correctAnswers={correctAnswersCount}
          savedWords={savedWordsCount}
        />
      )}

      {savedWordsCount > 0 && (
        <div className={styles.drill_time_range_row}>
          <Map
            data={durations}
            renderItem={(item) => (
              <DurationButton
                isActive={currentDuration === item.ms ? true : false}
                duration={item.duration}
                callback={() => dispatch(setDuration(item.ms))}
              />
            )}
          />
        </div>
      )}

      {savedWordsCount === 0 && (
        <Placeholder
          text="For start a drill please add words to your"
          link={{
            text: "Train List",
            href: "/train-section",
          }}
        />
      )}

      {savedWordsCount > 0 && <StartButton callback={startCallback} />}

      {isDrillOpen && (status === "pending" || status === "paused") && (
        <DrillWindow callback={cancelCallback} />
      )}

      <Timers
        status={status}
        duration={currentDuration}
        callback={cancelCallback}
      />
    </Layout>
  );
}
