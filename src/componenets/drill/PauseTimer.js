import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPath,
  selectDrillStep,
  selectSavedWordsCount,
  setDrillCompleteStatus,
  setStatus,
  successStep,
} from "../../features/train/trainSlice";

/**
 * When PauseTimer mounted to the DOM
 * it makes necassary pause tasks for the game.
 * When time is out the PauseTimer unmound
 * and fire the StartTimer.
 * When time is out at the last game step
 * the PauseTimer ends the game.
 */

export default function PauseTimer({ callback }) {
  const dispatch = useDispatch();
  const drillStep = useSelector(selectDrillStep);
  const savedWordsCount = useSelector(selectSavedWordsCount);
  useEffect(() => {
    if (drillStep === savedWordsCount - 1) {
      dispatch(setDrillCompleteStatus(true));
    }
    dispatch(resetPath());
    const t = setTimeout(() => {
      /**
       * At the last step the cancel callback
       * will be fired:
       */
      if (drillStep === savedWordsCount - 1) return callback();
      /**
       * Succeeds the next step, unmount
       * and start the next timer:
       */
      dispatch(successStep());
      return dispatch(setStatus("pending"));
    }, 2500);
    return () => clearTimeout(t);
  }, []);
}
