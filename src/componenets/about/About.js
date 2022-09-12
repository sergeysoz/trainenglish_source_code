import React from "react";
import Layout from "../layout/Layout";
import styles from "./About.module.css";

export default function About() {
  return (
    <Layout>
      <div className={styles.about_box}>
        <h1>TrainEnglish</h1>
        <p>
          Free dictionary with American, British, and Australian pronunciations
          and training tool.
        </p>
        <p>Developed by Sergey Sozontov</p>
      </div>
    </Layout>
  );
}
