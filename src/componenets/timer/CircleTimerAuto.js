import React from "react";
import { useSelector } from "react-redux";
import { selectPath } from "../../features/train/trainSlice";
import styles from "./CircleTimer.module.css";

export default function CircleTimerAuto() {
  const path = useSelector(selectPath);
  return (
    <div className={styles.circle_timer_box}>
      <svg
        width="100"
        height="100"
        viewBox={`0 0 100 100`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle fill="#9edadc" cx="50" cy="50" r="50" />
        <path fill="#174f71" d={path} />
      </svg>
    </div>
  );
}
