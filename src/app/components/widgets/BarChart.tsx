import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  CartesianGrid,
  YAxis,
} from "recharts";
import { BarChartWidget } from "@/types";
import styles from "./styles.module.css";

interface BarChartProps {
  widget: BarChartWidget;
}

export default function BarChart({ widget }: BarChartProps) {
  return (
    <div className={styles.container}>
      <h4>{widget.data.title}</h4>
      <p className={styles.description}>{widget.data.description}</p>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart width={150} height={40} data={widget.data.dataset}>
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Bar dataKey="uv" fill="#8884d8" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
