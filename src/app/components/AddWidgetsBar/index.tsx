"use client";

import { useDashboard } from "@/context/DashboardContext";
import Button from "@/components/Button";

import styles from "./styles.module.css";
import { WidgetType } from "@/types";

const ADD_WIDGET_BUTTONS: { label: string; type: WidgetType }[] = [
  {
    label: "Add Line Chart",
    type: "line-chart",
  },
  {
    label: "Add Bar Chart",
    type: "bar-chart",
  },
  {
    label: "Add Text Block",
    type: "text-block",
  },
];

export default function AddWidgetsBar() {
  const { addWidget } = useDashboard();

  return (
    <div className={styles.addWidgetsBar}>
      {ADD_WIDGET_BUTTONS.map((button) => (
        <Button
          key={button.type}
          label={button.label}
          onClick={() => addWidget(button.type)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}
