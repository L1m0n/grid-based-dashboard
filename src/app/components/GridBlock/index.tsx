"use client";

import { cn } from "@/utils/cn";
import LineChart from "../widgets/LineChart";
import BarChart from "../widgets/BarChart";
import TextBlock from "../widgets/TextBlock";
import { useGridBlock } from "./hooks/useGridBlock";
import { Widget } from "@/types";
import styles from "./styles.module.css";

interface GridBlockProps {
  widget?: Widget;
  position: number;
}

function renderWidget(widget: Widget) {
  switch (widget.type) {
    case "line-chart":
      return <LineChart widget={widget} />;
    case "bar-chart":
      return <BarChart widget={widget} />;
    case "text-block":
      return <TextBlock widget={widget} />;
    default:
      return <div>Unknown widget type</div>;
  }
}

export default function GridBlock({ widget, position }: GridBlockProps) {
  const {
    dragAttributes,
    dragListeners,
    setRefs,
    isDragging,
    isOver,
    handleDelete,
  } = useGridBlock(position, widget);

  return (
    <div
      ref={setRefs}
      className={cn(
        widget ? styles.hasWidget : "",
        isOver && !widget ? styles.dropTarget : "",
        isDragging ? styles.dragging : ""
      )}
      {...(widget ? dragAttributes : {})}
      {...(widget ? dragListeners : {})}
    >
      {widget ? (
        <div className={styles.gridBlock}>
          {renderWidget(widget)}
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            aria-label="Delete widget"
          >
            ×
          </button>
        </div>
      ) : (
        <div className={styles.empty} />
      )}
    </div>
  );
}
