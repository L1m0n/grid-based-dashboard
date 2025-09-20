# Grid-Based Dashboard

🚀 **Live Demo**: [https://grid-based-dashboard-rouge.vercel.app/](https://grid-based-dashboard-rouge.vercel.app/)

## 🛠️ **Tech Stack**

- **Frontend**: React 19 + TypeScript + Next.js 15
- **Styling**: CSS Modules
- **State Management**: React Context + useState hooks
- **Drag & Drop**: @dnd-kit library
- **Charts**: Recharts for data visualization
- **Package Manager**: pnpm
- **Deployment**: Vercel

## 🏗️ **Architecture**

### **Type-Safe Design**
```typescript
// Discriminated union types for widget safety
export type Widget = LineChartWidget | BarChartWidget | TextBlockWidget;

// Chart widgets have dataset
type LineChartWidget = {
  type: "line-chart";
  data: ChartData; // includes dataset: DatasetPoint[]
};

// Text widgets have content
type TextBlockWidget = {
  type: "text-block";
  data: TextData; // includes content: string
};
```

### **Clean Component Structure**
```
src/
├── app/
│   ├── components/
│   │   ├── GridDashboard/        # Main grid container + hooks
│   │   ├── GridBlock/            # Individual cells + drag/drop logic
│   │   ├── AddWidgetsBar/        # Widget creation buttons
│   │   └── widgets/              # Typed widget components
│   │       ├── LineChart.tsx     # Chart visualization
│   │       ├── BarChart.tsx      # Bar visualization  
│   │       └── TextBlock.tsx     # Text content
├── context/
│   └── DashboardContext.tsx      # Global state management
├── types/
│   └── index.ts                  # TypeScript definitions
└── mock/
    └── index.ts                  # Sample data
```

### **Performance Optimizations**
- **useCallback** hooks for expensive operations
- **Set-based lookups** (O(1)) instead of array.includes (O(n))
- **Optimized re-renders** with proper dependency arrays
- **Dynamic grid calculation** based on widget positions

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+
- pnpm (recommended) or npm

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd grid-based-dashboard
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Build for Production**

```bash
pnpm build
pnpm start
```
