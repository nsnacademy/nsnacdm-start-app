import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NewTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [selectedTime, setSelectedTime] = useState(10);

  const times = [5, 10, 20, 25, 30];

  return (
    <>
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }

        .new-screen {
          width: 100%;
          height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          padding: 40px 20px 30px;
          box-sizing: border-box;
          max-width: 520px;
          margin: 0 auto;
        }

        /* ========= CENTER AREA ========= */
        .center-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          flex: 1;
          margin-top: 40px;
        }

        .task-box {
          width: 100%;
          background: #fff;
          border-radius: 26px;
          padding: 22px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          margin-bottom: 30px;
          max-width: 480px;
        }

        .input {
          width: 100%;
          height: 48px;
          border-radius: 16px;
          border: none;
          background: #f1f1f1;
          padding: 0 16px;
          font-size: 16px;
          outline: none;
          margin-bottom: 20px;
        }

        .label {
          font-size: 15px;
          color: #555;
          margin-bottom: 14px;
        }

        .time-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .time-btn {
          height: 42px;
          padding: 0 16px;
          border-radius: 16px;
          border: none;
          background: #f2f2f2;
          font-size: 15px;
          color: #444;
          transition: 0.18s;
        }

        .time-btn.active {
          background: #262626;
          color: white;
        }

        /* ========= ADD BUTTON ========= */
        .add-btn {
          width: 70%;
          height: 54px;
          background: #222;
          color: white;
          font-size: 17px;
          border-radius: 20px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
        }

        /* ========= NAVIGATION ========= */
        .nav-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: auto;
        }

        .nav-pill {
          width: 92%;
          max-width: 520px;
          height: 75px;
          background: #ffffff;
          border-radius: 28px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);

          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
        }

        .nav-item {
          border: none;
          background: none;
          opacity: 0.45;
          padding: 0;
          transition:
            transform 0.22s cubic-bezier(.25,.46,.45,.94),
            opacity .2s ease;
        }

        .nav-item.active {
          opacity: 1;
        }

        .nav-item:active {
          transform: translateY(-4px) scale(1.15);
          opacity: 0.85;
        }

        .nav-item svg {
          width: 32px;
          height: 32px;
          transition: transform .22s cubic-bezier(.25,.46,.45,.94);
        }

      `}</style>

      <div className="new-screen">

        {/* ========= CENTERED CONTENT ========= */}
        <div className="center-content">

          <div className="task-box">
            <input
              className="input"
              placeholder="Введите задачу"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />

            <div className="label">Запланированное время</div>

            <div className="time-row">
              {times.map((t) => (
                <button
                  key={t}
                  className={`time-btn ${selectedTime === t ? "active" : ""}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {t} мин
                </button>
              ))}

              <button
                className="time-btn"
                onClick={() => setSelectedTime(null)}
              >
                Другое
              </button>
            </div>
          </div>

          <button className="add-btn">
            Добавить
          </button>

        </div>

        {/* ========= NAVIGATION ========= */}
        <div className="nav-wrapper">
          <div className="nav-pill">

            <button
              className="nav-item"
              onClick={() => navigate("/")}
            >
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M12 3l8 7v10a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1V10l8-7z"/>
              </svg>
            </button>

            <button className="nav-item">
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M8 4c-2 0-3.3 1.4-3.3 3.5 0 2.4 2.4 6.2 3.5 6.2S12 10 12 7.5C12 5.4 10.3 4 8 4Z"/>
                <circle cx="8.5" cy="14.8" r="1.3"/>
                <path d="M16 9c-2 0-3.3 1.4-3.3 3.5 0 2.4 2.4 6.2 3.5 6.2s3.8-3.7 3.8-6.2C20 10.4 18.3 9 16 9Z"/>
                <circle cx="16.6" cy="18.5" r="1.3"/>
              </svg>
            </button>

            <button className="nav-item active">
              <svg viewBox="0 0 24 24" stroke="#6A6A6A" fill="none" strokeWidth="2">
                <rect x="4" y="7" width="16" height="13" rx="3"/>
                <path d="M9 7V5a3 3 0 0 1 6 0v2"/>
              </svg>
            </button>

            <button className="nav-item">
              <svg viewBox="0 0 24 24" stroke="#6A6A6A" fill="none" strokeWidth="2">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
              </svg>
            </button>

          </div>
        </div>

      </div>
    </>
  );
}
