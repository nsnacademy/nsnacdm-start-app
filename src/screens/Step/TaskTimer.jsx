import { useEffect, useRef, useState } from "react";
import { useTaskStore } from "../../store/taskStore";

export default function TaskTimer({ task }) {
  if (!task) return null;

  const finishTask = useTaskStore((s) => s.finishTask);
  const removeTask = useTaskStore((s) => s.removeTask);

  const TOTAL_SECONDS = task.time * 60;

  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [paused, setPaused] = useState(false);

  // running | exit | diagnose | thanks
  const [mode, setMode] = useState("running");

  const [exitLeft, setExitLeft] = useState(10);
  const [thanksLeft, setThanksLeft] = useState(2);

  const circleRef = useRef(null);
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  /* ===== INIT ===== */
  useEffect(() => {
    setRemaining(task.time * 60);
    setPaused(false);
    setMode("running");
    setExitLeft(10);
    setThanksLeft(2);
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

  /* ===== EXIT TIMER ===== */
  useEffect(() => {
    if (mode !== "exit") return;

    const interval = setInterval(() => {
      setExitLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          removeTask(task.id);
          finishTask();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, removeTask, finishTask, task.id]);

  /* ===== THANKS TIMER ===== */
  useEffect(() => {
    if (mode !== "thanks") return;

    const interval = setInterval(() => {
      setThanksLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          removeTask(task.id);
          finishTask();
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
  /* ===== EXIT SCREEN ======= */
  /* ========================= */

  if (mode === "exit") {
    return (
      <Screen>
        <Card>
          <Title>Попытка не завершена</Title>
          <Text>
            <strong>Ты уже попробовал — и это важно.</strong><br />
            Этот шаг был опытом, а не ошибкой.<br />
            Мы уберём задачу, чтобы ты мог начать с начала,<br />
            когда будет подходящий момент.
          </Text>

          <MiniLink onClick={() => setMode("diagnose")}>
            Понять, что помешало
          </MiniLink>

          <Timer>{exitLeft}</Timer>
        </Card>
      </Screen>
    );
  }

  /* ========================= */
  /* ===== DIAGNOSE ========= */
  /* ========================= */

  if (mode === "diagnose") {
    return (
      <Screen>
        <Card>
          <Title>Что больше всего повлияло?</Title>

          <Button onClick={() => setMode("thanks")}>
            Сейчас не лучшее время
          </Button>
          <Button onClick={() => setMode("thanks")}>
            Оказалось сложнее, чем ожидал
          </Button>
          <Button onClick={() => setMode("thanks")}>
            Это было не так важно
          </Button>
        </Card>
      </Screen>
    );
  }

  /* ========================= */
  /* ===== THANKS ============ */
  /* ========================= */

  if (mode === "thanks") {
    return (
      <Screen>
        <Card>
          <Text>
            Спасибо. Этого достаточно,<br />
            чтобы идти дальше.
          </Text>
          <Timer>{thanksLeft}</Timer>
        </Card>
      </Screen>
    );
  }

  /* ========================= */
  /* ===== RUNNING TIMER ===== */
  /* ========================= */

  return (
    <>
      <style>{baseStyles}</style>

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
            </div>
          </div>

          <div className="buttons">
            <button className="btn pause" onClick={() => setPaused(!paused)}>
              {paused ? "Продолжить" : "Пауза"}
            </button>

            <button className="btn stop" onClick={() => setMode("exit")}>
              Выйти
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ===== UI HELPERS ===== */

const Screen = ({ children }) => (
  <>
    <style>{baseStyles}</style>
    <div className="timer-screen">{children}</div>
  </>
);

const Card = ({ children }) => (
  <div className="card">{children}</div>
);

const Title = ({ children }) => (
  <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
    {children}
  </div>
);

const Text = ({ children }) => (
  <div style={{ fontSize: 15, opacity: 0.65, marginBottom: 18 }}>
    {children}
  </div>
);

const MiniLink = ({ children, onClick }) => (
  <div
    onClick={onClick}
    style={{
      fontSize: 13,
      opacity: 0.45,
      cursor: "pointer",
      marginBottom: 16,
    }}
  >
    {children}
  </div>
);

const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      height: 46,
      borderRadius: 14,
      border: "none",
      marginBottom: 10,
      background: "#f1f1f1",
      fontSize: 15,
    }}
  >
    {children}
  </button>
);

const Timer = ({ children }) => (
  <div style={{ fontSize: 34, fontWeight: 600 }}>{children}</div>
);

const baseStyles = `
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
    background: #fff;
    border-radius: 24px;
    padding: 24px 22px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  }
`;
