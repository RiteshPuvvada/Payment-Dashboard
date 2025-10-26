"use client";

import React, { useState, useEffect } from "react";
import styles from "./ChartCard.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EditModal from "../EditModal/EditModal";
import { getOverrides, saveOverrides } from "@/lib/api";

export default function ChartCard({ chartId = "call-duration" }: { chartId?: string }) {
  // Default dataset
  const initialData = [
    { name: "00:00", value: 45 },
    { name: "04:00", value: 50 },
    { name: "08:00", value: 80 },
    { name: "12:00", value: 100 },
    { name: "16:00", value: 85 },
    { name: "20:00", value: 60 },
    { name: "24:00", value: 45 },
  ];

  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  // Load saved chart data
  useEffect(() => {
    async function fetchOverrides() {
      try {
        const stored = await getOverrides(chartId);
        if (stored?.values) {
          setData(stored.values);
          setEmail(stored.email || null);
        }
      } catch (err) {
        console.error("Error loading overrides:", err);
      }
    }
    fetchOverrides();
  }, [chartId]);

  // Save handler with overwrite confirmation
  async function handleSave(newData: any[], userEmail: string) {
    try {
      const existing = await getOverrides(chartId);

      if (existing && existing.email === userEmail) {
        const confirmOverwrite = confirm(
          "We found your previous saved values. Do you want to overwrite them?"
        );
        if (!confirmOverwrite) {
          alert("Keeping previous values.");
          setOpen(false);
          return;
        }
      }

      await saveOverrides(chartId, userEmail, newData);
      setData(newData);
      setEmail(userEmail);
      alert("✅ Saved successfully!");
      setOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Failed to save chart values.");
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3>Call Duration Analysis</h3>
          {email && <p className={styles.subtitle}>Welcome back, {email}</p>}
        </div>
        <button onClick={() => setOpen(true)} className={styles.edit}>
          Edit Data
        </button>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            cursor={{ stroke: "#00FFCC", strokeWidth: 1, strokeDasharray: "3 3" }}
            contentStyle={{
              background: "rgba(10,12,16,0.9)",
              border: "1px solid rgba(0,255,204,0.3)",
              borderRadius: 10,
              color: "#E6FFFA",
              padding: "10px 14px",
              boxShadow: "0 0 10px #00FFCC40",
            }}
            labelStyle={{ color: "#ffffff", fontWeight: 600 }}
            itemStyle={{ color: "#00FFCC", fontWeight: 500 }}
          />

<Line
  type="monotone"
  dataKey="value"
  stroke="#00FFCC"
  strokeWidth={3}
  dot={false}
  activeDot={{
    r: 8,
    stroke: "#00FFCC",
    strokeWidth: 3,
    fill: "#00FFCC",
    filter: "drop-shadow(0 0 12px #00FFCCAA)",
  }}
  animationDuration={1000}
  animationBegin={200}
  isAnimationActive={true}
/>

        </LineChart>
      </ResponsiveContainer>

      {/* Modal for editing chart values */}
      <EditModal
        open={open}
        initialData={data}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
