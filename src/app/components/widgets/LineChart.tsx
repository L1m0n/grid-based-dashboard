import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChartWidget } from "@/types";
import styles from "./styles.module.css";

interface LineChartProps {
  widget: LineChartWidget;
}

export default function LineChart({ widget }: LineChartProps) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{widget.data.title}</h4>
      <p className={styles.description}>{widget.data.description}</p>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          width={150}
          height={40}
          data={widget.data.dataset}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            isAnimationActive={false}
          />
          <Line 
            type="monotone" 
            dataKey="uv" 
            stroke="#82ca9d" 
            isAnimationActive={false}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
