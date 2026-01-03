import { useEffect, useRef, useState } from "react";

export default function TaskTimer() {
  const TOTAL_SECONDS = 10 * 60;

  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [paused, setPaused] = useState(false);

  const circleRef = useRef(null);
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!circleRef.current) return;

    circleRef.current.style.strokeDasharray = `${circumference}`;
    circleRef.current.style.strokeDashoffset = "0";
  }, []);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
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
    const offset = circumference * (1 - progress);
    circleRef.current.style.strokeDashoffset = offset;
  }, [remaining]);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        body {
          background: #f4f4f4;
        }

        .card {
          width: 320px;
          background: #ffffff;
          border-radius: 24px;
          padding: 20px 18px 22px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
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
          letter-spacing: 1px;
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
          cursor: pointer;
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

      <div className="card">
        <div className="title">Разобрать стол — 10 минут</div>

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
            <div className="reward">+12 ОД маленькая победа</div>
          </div>
        </div>

        <div className="buttons">
          <button className="btn pause" onClick={() => setPaused(!paused)}>
            {paused ? "Продолжить" : "Пауза"}
          </button>
          <button className="btn stop" onClick={() => setRemaining(0)}>
            Остановить
          </button>
        </div>
      </div>
    </>
  );
}
