import { useEffect, useRef, useState } from "react";
import { useTaskStore } from "../../store/taskStore";

export default function TaskTimer({ task }) {
  if (!task) return null;

  const finishTask = useTaskStore((s) => s.finishTask);
  const removeTask = useTaskStore((s) => s.removeTask);

  const TOTAL_SECONDS = task.time * 60;

  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState("running"); 
  // running | failed

  const [failLeft, setFailLeft] = useState(7);

  const circleRef = useRef(null);
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  /* ===== INIT / RESET ===== */
  useEffect(() => {
    setRemaining(task.time * 60);
    setPaused(false);
    setMode("running");
    setFailLeft(7);
  }, [task]);

  /* ===== TIMER RUN ===== */
  useEffect(() => {
    if (paused || mode !== "running") return;

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
  }, [paused, mode, finishTask]);

  /* ===== CIRCLE INIT ===== */
  useEffect(() => {
    if (!circleRef.current) return;

    circleRef.current.style.strokeDasharray = `${circumference}`;
    circleRef.current.style.strokeDashoffset = "0";
  }, [circumference]);

  /* ===== CIRCLE PROGRESS ===== */
  useEffect(() => {
    if (!circleRef.current || mode !== "running") return;

    const progress = remaining / TOTAL_SECONDS;
    const offset = circumference * (1 - progress);
    circleRef.current.style.strokeDashoffset = offset;
  }, [remaining, TOTAL_SECONDS, circumference, mode]);

  /* ===== FAIL SCREEN COUNTDOWN ===== */
  useEffect(() => {
    if (mode !== "failed") return;

    const interval = setInterval(() => {
      setFailLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          removeTask(task.id);   // ❌ удаляем задачу
          finishTask();          // ⬅️ выход на Home
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, removeTask, finishTask, task.id]);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  /* ========================= */
  /* ===== FAIL SCREEN ======= */
  /* ========================= */

  if (mode === "failed") {
    return (
      <>
        <style>{`
          .fail-screen {
            width: 100%;
            height: 100vh;
            background: #f4f4f4;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .fail-card {
            width: 320px;
            background: #fff;
            border-radius: 24px;
            padding: 28px 22px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          }

          .fail-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .fail-text {
            font-size: 15px;
            opacity: 0.65;
            margin-bottom: 20px;
          }

          .fail-timer {
            font-size: 36px;
            font-weight: 600;
          }
        `}</style>

        <div className="fail-screen">
          <div className="fail-card">
            <div className="fail-title">Попытка не завершена</div>
            <div className="fail-text">
              Мы сохранили факт попытки. Задача будет удалена.
            </div>
            <div className="fail-timer">{failLeft}</div>
          </div>
        </div>
      </>
    );
  }

  /* ========================= */
  /* ===== RUNNING TIMER ===== */
  /* ========================= */

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        .timer-screen {
          width: 100%;
          height: 100vh;
          background: #f4f4f4;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .card {
          width: 320px;
          background: #ffffff;
          border-radius: 24px;
          padding: 20px 18px 22px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .title {
          font-size: 15px;
          color: #555;
          margin-bottom: 18px;
        }

        .timer-wrap {
          position: relative;
          width: 220px;
          height: 220px;
          margin: 0 auto 20px;
        }

        svg {
          transform: rotate(-90deg);
        }

        .bg-circle {
          stroke: #e6e6e6;
        }

        .progress-circle {
          stroke: #bdbdbd;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.4s ease;
        }

        .time {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .time-main {
          font-size: 42px;
          font-weight: 500;
        }

        .reward {
          font-size: 13px;
          color: #9e9e9e;
          margin-top: 6px;
        }

        .buttons {
          display: flex;
          gap: 12px;
        }

        .btn {
          flex: 1;
          height: 46px;
          border-radius: 16px;
          border: none;
          font-size: 15px;
        }

        .pause {
          background: #2b2b2b;
          color: white;
        }

        .stop {
          background: #f1f1f1;
          color: #777;
        }
      `}</style>

      <div className="timer-screen">
        <div className="card">
          <div className="title">
            {task.title} — {task.time} минут
          </div>

          <div className="timer-wrap">
            <svg width="220" height="220">
              <circle
                className="bg-circle"
                strokeWidth="10"
                fill="transparent"
                r={radius}
                cx="110"
                cy="110"
              />
              <circle
                ref={circleRef}
                className="progress-circle"
                strokeWidth="10"
                fill="transparent"
                r={radius}
                cx="110"
                cy="110"
              />
            </svg>

            <div className="time">
              <div className="time-main">
                {minutes}:{seconds}
              </div>
              <div className="reward">
                +{task.od} ОД • маленькая победа
              </div>
            </div>
          </div>

          <div className="buttons">
            <button
              className="btn pause"
              onClick={() => setPaused(!paused)}
            >
              {paused ? "Продолжить" : "Пауза"}
            </button>

            <button
              className="btn stop"
              onClick={() => setMode("failed")}
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
