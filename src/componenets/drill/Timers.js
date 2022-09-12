import React from "react";
import PauseTimer from "./PauseTimer";
import StartTimer from "./StartTimer";

export default function Timers({
  children,
  status = "idle",
  duration,
  callback,
}) {
  return (
    <>
      {children}
      {status === "pending" && <StartTimer duration={duration} />}
      {status === "paused" && <PauseTimer callback={callback} />}
    </>
  );
}
