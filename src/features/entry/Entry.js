import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isInHash, readFromHash } from "../../auxiliaries/hash";
import SaveButton from "../../componenets/button/SaveButton";
import Details from "../../componenets/details/Details";
import History from "../../componenets/history/History";
import Layout from "../../componenets/layout/Layout";
import Part from "../../componenets/part/Part";
import Phonetic from "../../componenets/phonetic/Phonetic";
import Definition from "../../componenets/definition/Definition";
import styles from "./Entry.module.css";
import Loader from "../../componenets/loader/Loader";
import queryTest from "../../auxiliaries/queryTest";
import PhoneticPlain from "../../componenets/phonetic/PhoneticPlain";
import { saveWord, setDrillCompleteStatus } from "../train/trainSlice";
import { searchEntry, selectEntry, selectStatus, setEntry } from "./entrySlice";
import Map from "../../componenets/constructs/Map";
import PartThesaurus from "../../componenets/thesaurus/PartThesaurus";
import isFulfilledAndSlot from "./isFulfilledAndSlot";

/**
 * Every change of the location fire
 * the useEffect of the component
 */

export default function Entry() {
  const { entry } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchedEntry = useSelector(selectEntry);
  const status = useSelector(selectStatus);
  useEffect(() => {
    if (queryTest(entry)) return navigate("/");
    document.title = `${
      entry[0].toUpperCase() + entry.slice(1)
    } - audio, meanings, trainings | TrainEnglish Dictionary at TrainEnglish.ru`;

    if (entry !== undefined) {
      if (!isInHash(entry)) {
        /**
         * async fetch:
         */
        dispatch(searchEntry(entry));
        return;
      }
      /**
       * sync read from hash:
       */
      dispatch(setEntry(readFromHash(entry)));
    }
  }, [location]);
  return (
    <Layout>
      {status === "pending" && <Loader loaderWidth={window.innerWidth} />}
      {isFulfilledAndSlot(status, fetchedEntry) && (
        <>
          <h1 className={styles.entry_word}>{fetchedEntry.word}</h1>
          <div className={styles.save_box}>
            {fetchedEntry.word && (
              <SaveButton
                word={fetchedEntry.word}
                callback={() => {
                  dispatch(setDrillCompleteStatus(false));
                  dispatch(saveWord(fetchedEntry.word));
                }}
              />
            )}
          </div>

          {(fetchedEntry?.phonetics === undefined ||
            fetchedEntry.phonetics.length === 0) &&
            fetchedEntry.phonetic && (
              <PhoneticPlain text={fetchedEntry.phonetic} />
            )}

          {(fetchedEntry.word || fetchedEntry?.phonetics.length > 0) && (
            <div className={styles.phonetic_box}>
              <Map
                data={fetchedEntry.phonetics}
                renderItem={(item) => {
                  if (item.audio !== undefined) {
                    return <Phonetic text={item.text} audio={item.audio} />;
                  }
                }}
              />
            </div>
          )}

          {fetchedEntry.word && (
            <Map
              data={fetchedEntry.meanings}
              renderItem={(item, i) => (
                <Part key={i.toString()} partOfSpeech={item.partOfSpeech}>
                  <Map
                    data={item.definitions}
                    renderItem={(item, i) => (
                      <Definition
                        key={i.toString()}
                        word={fetchedEntry.word}
                        definition={item}
                        count={i}
                      />
                    )}
                  />

                  {item.synonyms.length > 0 && (
                    <PartThesaurus
                      thesaurusArray={item.synonyms}
                      word={fetchedEntry.word}
                      partOfSpeech={item.partOfSpeech}
                      synonym
                    />
                  )}

                  {item.antonyms.length > 0 && (
                    <PartThesaurus
                      thesaurusArray={item.antonyms}
                      word={fetchedEntry.word}
                      partOfSpeech={item.partOfSpeech}
                    />
                  )}
                </Part>
              )}
            />
          )}

          {fetchedEntry.word &&
            fetchedEntry?.license !== undefined &&
            fetchedEntry.license && (
              <Details
                licenseName={fetchedEntry.license.name}
                licenseUrl={fetchedEntry.license.url}
                sourceUrls={fetchedEntry.sourceUrls}
              />
            )}
        </>
      )}

      {!isFulfilledAndSlot(status, fetchedEntry) && (
        <>
          <h1 className={styles.rejected_word}>{fetchedEntry.noMatchedWord}</h1>
          <p className={styles.rejected_message}>{fetchedEntry.errorMessage}</p>
        </>
      )}

      <History />
    </Layout>
  );
}
