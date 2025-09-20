export type WidgetType = "line-chart" | "bar-chart" | "text-block";

export interface DatasetPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

interface BaseWidget {
  id: string;
  order: number;
}

export interface ChartData {
  title: string;
  description: string;
  dataset: DatasetPoint[];
}

export interface TextData {
  title: string;
  content: string;
}

export type LineChartWidget = BaseWidget & {
  type: "line-chart";
  data: ChartData;
};

export type BarChartWidget = BaseWidget & {
  type: "bar-chart";
  data: ChartData;
};

export type TextBlockWidget = BaseWidget & {
  type: "text-block";
  data: TextData;
};

export type Widget = LineChartWidget | BarChartWidget | TextBlockWidget;

export type DashboardSettings = {
  colsCount: number;
  minRowsCount: number;
};
