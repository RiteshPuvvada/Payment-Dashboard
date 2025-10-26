"use client";

import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";
import ChartCard from "@/components/ChartCard/ChartCard";
import PieChartCard from "@/components/PieChartCard/PieChartCard";

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        
        <section className={styles.hero}>
          <h1>
            Helping Engineering Teams
            <br />
            <span className={styles.gradient}>Scale Voice AI</span>
          </h1>
          <p className={styles.subtext}>
            Voice agents fail. We make fixing them effortless.
          </p>
          <button className={styles.cta}>Get Started</button>
        </section>

        <div className={styles.chartSection}>
          <ChartCard />
          <PieChartCard />
        </div>
      </div>

      <Footer />
    </div>
  );
}