"use client";

import React, { useState } from "react";
import styles from "./PieChartCard.module.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#00FFCC", "#14B8A6", "#38BDF8", "#A78BFA",
  "#F472B6", "#F59E0B", "#EF4444",
];

const data = [
  { name: "Caller Identification", value: 20 },
  { name: "User refused to confirm identity", value: 15 },
  { name: "Verbal Agreement", value: 10 },
  { name: "Customer Hostility", value: 12 },
  { name: "Assistant did not speak French", value: 13 },
  { name: "Unsupported Language", value: 18 },
  { name: "Incorrect caller identity", value: 12 },
];

export default function PieChartCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Sad Path Analysis</h3>
        <button className={styles.edit}>Edit Data</button>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, i) => {
                const fill = COLORS[i % COLORS.length];
                const isActive = i === activeIndex;
                return (
                  <Cell
                    key={i}
                    fill={fill}
                    stroke={isActive ? "rgba(255,255,255,0.08)" : "none"}
                    strokeWidth={isActive ? 2 : 0}
                    style={{
                      transition: "transform .22s ease, filter .22s ease",
                      transform: isActive ? "scale(1.04)" : "scale(1)",
                      filter: isActive ? "drop-shadow(0 0 12px rgba(0,255,204,0.45))" : "none",
                    }}
                  />
                );
              })}
            </Pie>

            <Tooltip
              cursor={false}
              contentStyle={{
                background: "rgba(10,12,16,0.95)",
                border: "1px solid rgba(0,255,204,0.18)",
                borderRadius: 8,
                padding: "8px 12px",
                color: "#fff",
                boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
              }}
              itemStyle={{ color: "var(--accent)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}