import { useEffect, useRef, useState } from "react";
import { useTaskStore } from "../../store/taskStore";

export default function TaskTimer({ task }) {
  if (!task) return null;

  const finishTask = useTaskStore((s) => s.finishTask);
  const removeTask = useTaskStore((s) => s.removeTask);

  const TOTAL_SECONDS = task.time * 60;

  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [paused, setPaused] = useState(false);

  // running | micro | realize | exit | thanks | complete
  const [mode, setMode] = useState("running");

  const [exitLeft, setExitLeft] = useState(10);
  const [thanksLeft, setThanksLeft] = useState(5);

  const circleRef = useRef(null);
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  /* ===== INIT ===== */
  useEffect(() => {
    setRemaining(task.time * 60);
    setPaused(false);
    setMode("running");
    setExitLeft(10);
    setThanksLeft(5);
  }, [task]);

  /* ===== TIMER RUN ===== */
  useEffect(() => {
    if (paused || mode !== "running") return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setMode("complete");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, mode]);

  /* ===== CIRCLE ===== */
  useEffect(() => {
    if (!circleRef.current) return;
    circleRef.current.style.strokeDasharray = `${circumference}`;
    circleRef.current.style.strokeDashoffset = "0";
  }, [circumference]);

  useEffect(() => {
    if (!circleRef.current || mode !== "running") return;
    const progress = remaining / TOTAL_SECONDS;
    circleRef.current.style.strokeDashoffset =
      circumference * (1 - progress);
  }, [remaining, TOTAL_SECONDS, circumference, mode]);

  /* ===== EXIT AUTO REMOVE ===== */
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
  }, [mode, task.id]);

  /* ===== THANKS AUTO REMOVE ===== */
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
  }, [mode, task.id]);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  /* ================= COMPLETE ================= */

  if (mode === "complete") {
    const od = task.od;
    const hp = Math.round(task.time * 2.5);

    return (
      <>
        <style>{completeStyles}</style>

        <div className="complete-screen">
          <div className="complete-card">
            <div className="complete-title">Маленькая победа!</div>
            <div className="complete-sub">
              Ты выполнил задачу и заработал
            </div>

            <div className="complete-reward">+{od} ОД</div>
            <div className="complete-hp">+{hp} ХП</div>

            <img
              src="/src/assets/reward-chest.png"
              alt="Награда"
              className="complete-image"
            />

            <button
              className="btn pause"
              onClick={() => {
                removeTask(task.id);
                finishTask();
              }}
            >
              Завершить задачу
            </button>
          </div>
        </div>
      </>
    );
  }

  /* ================= MICRO ================= */

  if (mode === "micro") {
    return (
      <>
        <style>{exitStyles}</style>
        <div className="exit-screen">
          <div className="exit-card">
            <div className="exit-text">
              Похоже, этот шаг оказался слишком большим для этого момента.
              <br />
              Давай сделаем его совсем маленьким.
            </div>

            <div className="exit-text">
              <strong>2 минуты.</strong><br />
              Просто сделай один простой шаг — любой.
            </div>

            <div className="buttons">
              <button className="btn pause" onClick={() => setMode("realize")}>
                Я сделал
              </button>
              <button className="btn stop" onClick={() => setMode("exit")}>
                Всё равно выйти
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ================= REALIZE ================= */

  if (mode === "realize") {
    return (
      <>
        <style>{exitStyles}</style>
        <div className="exit-screen">
          <div className="exit-card">
            <div className="exit-text">
              <strong>Видишь?</strong><br />
              Ты уже сделал шаг — и даже не заметил этого.
            </div>

            <div className="buttons">
              <button className="btn pause" onClick={() => setMode("running")}>
                Вернуться к задаче
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

  /* ================= EXIT ================= */

  if (mode === "exit") {
    return (
      <>
        <style>{exitStyles}</style>
        <div className="exit-screen">
          <div className="exit-card">
            <div className="exit-text">
              <strong>Ты уже попробовал — и это важно.</strong><br />
              Этот шаг был опытом, а не ошибкой.
            </div>
            <div className="exit-timer">{exitLeft}</div>
          </div>
        </div>
      </>
    );
  }

  /* ================= RUNNING TIMER ================= */

  return (
    <>
      <style>{timerStyles}</style>

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
            <button className="btn pause" onClick={() => setPaused(!paused)}>
              {paused ? "Продолжить" : "Пауза"}
            </button>
            <button className="btn stop" onClick={() => setMode("micro")}>
              Выйти
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ===== STYLES ===== */

const completeStyles = `
.complete-screen {
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.complete-card {
  width: 320px;
  background: #fff;
  border-radius: 24px;
  padding: 28px 22px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.complete-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
}

.complete-sub {
  font-size: 14px;
  opacity: 0.6;
  margin-bottom: 18px;
}

.complete-reward {
  font-size: 34px;
  font-weight: 600;
}

.complete-hp {
  font-size: 16px;
  opacity: 0.7;
  margin-bottom: 16px;
}

.complete-image {
  width: 180px;
  margin: 0 auto 22px;
  display: block;
}
`;

const exitStyles = `
.exit-screen {
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.exit-card {
  width: 320px;
  background: #fff;
  border-radius: 24px;
  padding: 26px 22px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.exit-text {
  font-size: 15px;
  line-height: 1.5;
  opacity: 0.75;
  margin-bottom: 18px;
}

.exit-timer {
  font-size: 28px;
  font-weight: 600;
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
`;

const timerStyles = `
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

.timer-screen {
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
`;
