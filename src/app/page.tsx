import { DashboardProvider } from "@/context/DashboardContext";
import AddWidgetsBar from "./components/AddWidgetsBar";
import GridDashboard from "./components/GridDashboard";

import styles from "./page.module.css";

export default function Home() {
  return (
    <DashboardProvider>
      <main className={styles.main}>
        <AddWidgetsBar />
        <GridDashboard />
      </main>
    </DashboardProvider>
  );
}
