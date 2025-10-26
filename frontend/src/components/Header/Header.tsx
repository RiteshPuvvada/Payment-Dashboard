import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        💸 <span className={styles.brand}>Paycheck.AI</span>
      </div>
      <nav className={styles.nav}>
        <a href="#">Home</a>
        <a href="#">Insights</a>
        <button className={styles.talk}>Talk to Us</button>
      </nav>
    </header>
  );
}
