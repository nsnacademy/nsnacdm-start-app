import { useEffect, useState } from "react";
import { useTaskStore } from "../../store/taskStore";

export default function TaskTimer() {
  const activeTask = useTaskStore((s) => s.activeTask);
  const clearActiveTask = useTaskStore((s) => s.clearActiveTask);

  if (!activeTask) return null;

  const [seconds, setSeconds] = useState(activeTask.time * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          clearActiveTask();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mm = Math.floor(seconds / 60);
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#fff",
        zIndex: 1000,
        padding: 24,
      }}
    >
      <h3>{activeTask.title}</h3>

      <div style={{ fontSize: 40, margin: "20px 0" }}>
        {mm}:{ss}
      </div>

      <div>+{activeTask.od} ОД</div>

      <button onClick={clearActiveTask}>
        Остановить
      </button>
    </div>
  );
}
