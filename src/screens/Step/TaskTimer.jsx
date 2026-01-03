import { useEffect, useRef, useState } from "react";
import { useTaskStore } from "../../store/taskStore";

export default function TaskTimer() {
  const activeTask = useTaskStore((s) => s.activeTask);
  const finishTask = useTaskStore((s) => s.finishTask);

  if (!activeTask) return null;

  const TOTAL_SECONDS = activeTask.time * 60;

  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [paused, setPaused] = useState(false);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const circleRef = useRef(null);

  useEffect(() => {
    if (!circleRef.current) return;
    circleRef.current.style.strokeDasharray = `${circumference}`;
    circleRef.current.style.strokeDashoffset = 0;
  }, []);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishTask();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    if (!circleRef.current) return;
    const progress = remaining / TOTAL_SECONDS;
    circleRef.current.style.strokeDashoffset =
      circumference * (1 - progress);
  }, [remaining]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div style={{ padding: 20 }}>
      <h3>{activeTask.title}</h3>

      <svg width="220" height="220" style={{ transform: "rotate(-90deg)" }}>
        <circle
          r={radius}
          cx="110"
          cy="110"
          stroke="#e6e6e6"
          strokeWidth="10"
          fill="none"
        />
        <circle
          ref={circleRef}
          r={radius}
          cx="110"
          cy="110"
          stroke="#bdbdbd"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div style={{ fontSize: 40 }}>{mm}:{ss}</div>
      <div>+{activeTask.od} ОД маленькая победа</div>

      <button onClick={() => setPaused(!paused)}>
        {paused ? "Продолжить" : "Пауза"}
      </button>

      <button onClick={finishTask}>Остановить</button>
    </div>
  );
}
