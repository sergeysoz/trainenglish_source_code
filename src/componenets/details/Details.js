import React from "react";
import styles from "./Details.module.css";
import Map from "../constructs/Map";

export default function Details({ licenseName, licenseUrl, sourceUrls = [] }) {
  return (
    <div className={styles.details_box}>
      <h4>Details:</h4>
      {sourceUrls.length !== 0 && (
        <div>
          <h6>Source Links:</h6>
          <Map
            data={sourceUrls}
            renderItem={(item) => (
              <a className={styles.source_link} href={item}>
                {item}
              </a>
            )}
          />
        </div>
      )}
      <h6>License:</h6>
      <a href={licenseUrl}>{licenseName}</a>
    </div>
  );
}
