import React from "react";
import { Route, Routes } from "react-router-dom";
import Drill from "./componenets/drill/Drill";
import Start from "./componenets/start/Start";
import About from "./componenets/about/About";
import Entry from "./features/entry/Entry";
import Train from "./features/train/Train";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Start />} />
        <Route path="/train-section" element={<Train />} />
        <Route path="/drill-section" element={<Drill />} />
        <Route path="/about-section" element={<About />} />
        <Route path="/:entry" element={<Entry />} />
      </Routes>
    </div>
  );
}

export default App;
