import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logoSection}>
              <span style={{ fontSize: "28px" }}>💸</span>
              <span className={styles.logo}>Paycheck.AI</span>
            </div>
            <p className={styles.tagline}>
              Voice agents fail. We make fixing them effortless. Scale your AI voice operations with confidence.
            </p>
            <div className={styles.author}>
              <span>✨ Built by</span>
              <span className={styles.authorName}>Ritesh</span>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Product</h4>
            <div className={styles.links}>
              <a href="#" className={styles.link}>Features</a>
              <a href="#" className={styles.link}>Pricing</a>
              <a href="#" className={styles.link}>Documentation</a>
              <a href="#" className={styles.link}>API Reference</a>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Company</h4>
            <div className={styles.links}>
              <a href="#" className={styles.link}>About</a>
              <a href="#" className={styles.link}>Blog</a>
              <a href="#" className={styles.link}>Careers</a>
              <a href="#" className={styles.link}>Contact</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 Paycheck.AI. All rights reserved.
          </p>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} title="Twitter">𝕏</a>
            <a href="#" className={styles.socialLink} title="GitHub">⚡</a>
            <a href="#" className={styles.socialLink} title="LinkedIn">in</a>
          </div>
        </div>
      </div>
    </footer>
  );
}