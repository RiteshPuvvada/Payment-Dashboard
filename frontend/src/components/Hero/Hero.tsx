import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1>Make every paycheck count</h1>
        <p>Visualize, prioritize, and control your budget effortlessly.</p>
        <div className={styles.actions}>
          <button className={styles.primary}>Open dashboard</button>
          <button className={styles.secondary}>Docs</button>
        </div>
      </div>
      <div className={styles.preview}>
        <div className={styles.card}> {/* will place chart later */} </div>
      </div>
    </section>
  );
}
