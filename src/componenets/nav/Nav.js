import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectSavedWordsCount } from "../../features/train/trainSlice";
import styles from "./Nav.module.css";

export default function Nav() {
  const savedWordsCount = useSelector(selectSavedWordsCount);
  return (
    <div className={styles.nav}>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.nav_link + " " + styles.nav_active : styles.nav_link
        }
        to="/train-section"
      >
        Train
        {savedWordsCount !== 0 && (
          <span className={styles.count_spot}>
            <p>{savedWordsCount}</p>
          </span>
        )}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.nav_link + " " + styles.nav_active : styles.nav_link
        }
        to="/drill-section"
      >
        Drill
      </NavLink>
    </div>
  );
}
