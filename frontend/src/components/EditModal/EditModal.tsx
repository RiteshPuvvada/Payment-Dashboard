"use client";

import React, { useState, useEffect } from "react";
import styles from "./EditModal.module.css";

export default function EditModal({ open, initialData, onClose, onSave }: any) {
  const [values, setValues] = useState(initialData);

  useEffect(() => setValues(initialData), [initialData]);

  if (!open) return null;

  function updateValue(idx: number, val: number) {
    const copy = [...values];
    copy[idx] = { ...copy[idx], value: Number(val) };
    setValues(copy);
  }

  function handleSave() {
    const email = prompt("Enter your email to save changes:");
    if (!email) {
      alert("Email is required to save.");
      return;
    }
    onSave(values, email);
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>Edit chart values</h3>

        <div className={styles.list}>
          {values.map((d: any, i: number) => (
            <div key={d.name} className={styles.row}>
              <div className={styles.name}>{d.name}</div>
              <input
                className={styles.input}
                value={d.value}
                type="number"
                onChange={(e) => updateValue(i, Number(e.target.value))}
              />
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancel}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
