import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useCallback, useMemo, useState } from "react";
import { Widget } from "@/types";
import { useDashboard } from "@/context/DashboardContext";

export const useGridDashboard = () => {
  const {
    getWidgetAtPosition,
    moveWidget,
    calculateTotalCells,
    dashboardSettings,
  } = useDashboard();
  const [activeWidget, setActiveWidget] = useState<Widget | null>(null);

  const totalCells = useMemo(
    () => calculateTotalCells(),
    [calculateTotalCells]
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const widget = getWidgetAtPosition(Number(active.id));
      setActiveWidget(widget || null);
    },
    [getWidgetAtPosition]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || !activeWidget) {
        setActiveWidget(null);
        return;
      }

      const activePosition = Number(active.id);
      const overPosition = Number(over.id);

      if (activePosition !== overPosition) {
        const targetWidget = getWidgetAtPosition(overPosition);
        if (!targetWidget) {
          moveWidget(activeWidget.id, overPosition);
        }
      }

      setActiveWidget(null);
    },
    [getWidgetAtPosition, moveWidget, activeWidget]
  );

  return {
    totalCells,
    handleDragStart,
    handleDragEnd,
    activeWidget,
    getWidgetAtPosition,
    dashboardSettings,
  };
};
