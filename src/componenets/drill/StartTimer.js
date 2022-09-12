import { useEffect } from "react";
import { useDispatch } from "react-redux";
import makeArc from "../../auxiliaries/arc";
import {
  setCorrectStatus,
  setPath,
  setStatus,
} from "../../features/train/trainSlice";
import bell from "./bell.mp3";

/**
 * When the StartTimer mounted to the DOM
 * it starts yielding new paths for the timer widget.
 * During the interval working the timer
 * call the path builder function.
 * When time is up the StartTimer unmounts and
 * fire the next PauseTimer.
 */

export default function StartTimer({ duration }) {
  const dispatch = useDispatch();
  const alarm = new Audio(bell);
  useEffect(() => {
    dispatch(setCorrectStatus(false));
    let a = 0;
    const t = setInterval(() => {
      /**
       * Get alarm and unmount when time is up:
       */
      if (a === 361) {
        alarm.play();
        return dispatch(setStatus("paused"));
      }
      /**
       * Fire the arc path builder function:
       */
      dispatch(setPath(makeArc(a)));
      ++a;
    }, duration / 360);
    return () => clearInterval(t);
  }, []);
}
