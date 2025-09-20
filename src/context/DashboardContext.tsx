"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Widget, WidgetType, DashboardSettings } from "@/types";
import { lineChartDataMock, barChartDataMock, textBlockDataMock } from "@/mock";

interface DashboardContextType {
  widgets: Widget[];
  addWidget: (type: WidgetType) => void;
  deleteWidget: (widget: Widget) => void;
  moveWidget: (id: string, newOrder: number) => void;
  getWidgetAtPosition: (position: number) => Widget | undefined;
  getFirstEmptyPosition: () => number | null;
  calculateTotalCells: () => number;
  dashboardSettings: DashboardSettings;
}

const createWidgetData = (type: WidgetType) => {
  switch (type) {
    case "line-chart":
      return lineChartDataMock;
    case "bar-chart":
      return barChartDataMock;
    case "text-block":
      return textBlockDataMock;
    default:
      throw new Error(`Unknown widget type: ${type}`);
  }
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [dashboardSettings] = useState<DashboardSettings>({
    colsCount: 3,
    minRowsCount: 4,
  });
  const [maxPosition, setMaxPosition] = useState<number>(0);

  const getFirstEmptyPosition = useCallback((): number | null => {
    const occupiedSet = new Set(widgets.map((w) => w.order));

    const { colsCount, minRowsCount } = dashboardSettings;
    const minCells = colsCount * minRowsCount;

    for (let i = 1; i <= minCells; i++) {
      if (!occupiedSet.has(i)) {
        return i;
      }
    }

    const currentMaxPosition =
      widgets.length > 0
        ? Math.max(maxPosition, ...widgets.map((w) => w.order))
        : 0;
    const searchLimit = Math.max(minCells, currentMaxPosition + colsCount);

    for (let i = minCells + 1; i <= searchLimit; i++) {
      if (!occupiedSet.has(i)) {
        return i;
      }
    }

    return null;
  }, [widgets, dashboardSettings, maxPosition]);

  const addWidget = useCallback(
    (type: WidgetType) => {
      const emptyPosition = getFirstEmptyPosition();
      if (emptyPosition === null) return;

      const newWidget: Widget = {
        id: Date.now().toString(),
        type,
        data: createWidgetData(type),
        order: emptyPosition,
      } as Widget;

      setMaxPosition(Math.max(maxPosition, emptyPosition));

      setWidgets((prev) => [...prev, newWidget]);
    },
    [getFirstEmptyPosition, maxPosition]
  );

  const deleteWidget = useCallback((widget: Widget) => {
    const { id } = widget;
    setWidgets((prev) => {
      const newWidgets = prev.filter((widget) => widget.id !== id);
      const newMaxPosition =
        newWidgets.length > 0 ? Math.max(...newWidgets.map((w) => w.order)) : 0;
      setMaxPosition(newMaxPosition);
      return newWidgets;
    });
  }, []);

  const moveWidget = useCallback(
    (id: string, newOrder: number) => {
      const isPositionOccupied = widgets.some(
        (w) => w.id !== id && w.order === newOrder
      );
      if (isPositionOccupied) return;

      setWidgets((prev) => {
        const newWidgets = prev.map((widget) =>
          widget.id === id ? { ...widget, order: newOrder } : widget
        );

        const newMaxPosition = Math.max(maxPosition, newOrder);
        setMaxPosition(newMaxPosition);
        return newWidgets;
      });
    },
    [widgets, maxPosition]
  );

  const getWidgetAtPosition = useCallback(
    (position: number): Widget | undefined => {
      return widgets.find((widget) => widget.order === position);
    },
    [widgets]
  );

  const calculateTotalCells = useCallback(() => {
    const { colsCount, minRowsCount } = dashboardSettings;
    const minCells = minRowsCount * colsCount;

    if (widgets.length === 0) return minCells;

    const requiredRows = Math.ceil(maxPosition / colsCount);
    const actualRows = Math.max(minRowsCount, requiredRows + 1);

    return actualRows * colsCount;
  }, [widgets, dashboardSettings, maxPosition]);

  const value: DashboardContextType = {
    widgets,
    addWidget,
    deleteWidget,
    moveWidget,
    getWidgetAtPosition,
    getFirstEmptyPosition,
    calculateTotalCells,
    dashboardSettings,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
