"use client";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import GridBlock from "../GridBlock";
import { useGridDashboard } from "./hooks/useGridDashboard";
import { cn } from "@/utils/cn";

import styles from "./styles.module.css";

export default function GridDashboard() {
  const {
    totalCells,
    handleDragStart,
    handleDragEnd,
    activeWidget,
    getWidgetAtPosition,
    dashboardSettings,
  } = useGridDashboard();

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        className={cn(
          styles.gridDashboard,
          styles[`cols${dashboardSettings.colsCount}`]
        )}
      >
        {Array.from({ length: totalCells }, (_, index) => {
          const position = index + 1;
          const widget = getWidgetAtPosition(position);
          return (
            <GridBlock key={position} widget={widget} position={position} />
          );
        })}
      </div>

      <DragOverlay adjustScale={false} dropAnimation={null}>
        {activeWidget ? (
          <div className={styles.dragOverlay}>
            <GridBlock widget={activeWidget} position={0} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
