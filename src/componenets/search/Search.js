import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import queryTest from "../../auxiliaries/queryTest";
import SearchButton from "../button/SearchButton";
import Nav from "../nav/Nav";
import styles from "./Search.module.css";
import logo from "./logo.svg";

export default function Search() {
  const searchQuery = useRef("");
  const searchField = useRef();
  const navigate = useNavigate();
  const { entry } = useParams();
  const go = () => {
    searchQuery.current = searchQuery.current.toLowerCase();
    if (queryTest(searchQuery.current)) {
      searchField.current.value = "";
      return;
    }
    if (entry === searchQuery.current) {
      searchField.current.value = "";
      return;
    }
    if (!searchQuery.current.length) return;
    navigate(`/${searchQuery.current}`);
    searchField.current.value = "";
    return;
  };
  useEffect(() => {
    searchField.current.focus();
  }, []);
  return (
    <div className={styles.search_spot}>
      <div className={styles.wordmark}>
        <img src={logo} alt="logo" />
        <p>TrainEnglish</p>
      </div>
      <div className={styles.search_box}>
        <div className={styles.search}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              go();
            }}
          >
            <input
              className={styles.search_input}
              ref={searchField}
              type="text"
              onKeyDown={({ code }) => {
                if (code === "Enter") go();
              }}
              onChange={({ target }) => {
                searchQuery.current = target.value;
              }}
              placeholder="Search Dictionary"
            />
          </form>
          <SearchButton callback={() => go()} />
        </div>
        <Nav></Nav>
      </div>
    </div>
  );
}
