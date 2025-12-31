import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NewTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [selectedTime, setSelectedTime] = useState(10);

  const times = [10, 20, 30, 40, 50, 60];

  return (
    <>
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }

        /* ============================
           BASE LAYOUT (PHONE-FIRST)
        ==============================*/
        .new-screen {
          width: 100%;
          min-height: 100vh;              /* вместо height для Safari / iPad */
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          padding: calc(env(safe-area-inset-top) + 10px) 20px 20px;
          box-sizing: border-box;

          max-width: 520px;               /* идеально для телефона */
          margin: 0 auto;
        }

        /* ============================
           HEADER
        ==============================*/
        .header-zone {
          width: 100%;
          position: relative;
          margin-top: 50px;
          margin-bottom: 15px;
        }

        .back-btn {
          position: absolute;
          left: 0;
          top: 48px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .back-btn svg {
          width: 28px;
          height: 28px;
          stroke: #444;
          transition: 0.2s;
        }

        .back-btn:active svg {
          transform: translateX(-3px);
          opacity: 0.7;
        }

        .screen-title {
          text-align: center;
          width: 100%;
          font-size: 20px;
          font-weight: 600;
          color: #2c2c2c;
          padding-top: 44px;
        }

        /* ============================
           CONTENT CENTER
        ==============================*/
        .center-wrapper {
          width: 100%;
          flex: 1;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          margin-top: 40px;
        }

        /* ===== INPUT CARD ===== */
        .task-box {
          width: 100%;
          background: #fff;
          border-radius: 26px;
          padding: 22px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          margin-bottom: 25px;
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
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
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

        /* ===== REWARD (HORIZONTAL) ===== */
        .reward-box {
          width: 100%;
          background: #fff;
          border-radius: 26px;
          padding: 20px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 14px;

          margin-bottom: 30px;
        }

        .reward-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: #f1f1f1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reward-icon svg {
          width: 26px;
          height: 26px;
          fill: #FFC400;
        }

        .reward-text-group {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .reward-main {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .reward-sub {
          font-size: 13px;
          color: #777;
          margin-top: 2px;
        }

        /* ===== BUTTON ===== */
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
          margin-bottom: 60px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
        }

        /* ============================
           NAVIGATION
        ==============================*/
        .nav-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
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
          transition: transform 0.22s, opacity 0.2s;
        }

        .nav-item.active {
          opacity: 1;
        }

        .nav-item svg {
          width: 32px;
          height: 32px;
        }

        .nav-item:active {
          transform: translateY(-4px) scale(1.15);
        }

        /* ====================================================
           RESPONSIVE — SMALL PHONES (iPhone SE / older Android)
        ======================================================*/
        @media (max-width: 380px) {
          .screen-title { font-size: 18px; }
          .input { font-size: 15px; height: 44px; }
          .time-btn { padding: 0 12px; font-size: 14px; }
          .reward-main { font-size: 15px; }
          .add-btn { height: 50px; font-size: 16px; }
        }

        /* ====================================================
           RESPONSIVE — TABLETS (iPad Mini / 10th Gen)
        ======================================================*/
        @media (min-width: 700px) {
          .new-screen {
            max-width: 700px;
            padding: 40px 50px;
          }

          .screen-title {
            font-size: 26px;
            padding-top: 60px;
          }

          .task-box {
            padding: 30px;
            border-radius: 30px;
          }

          .input {
            height: 56px;
            font-size: 18px;
          }

          .time-btn {
            height: 50px;
            font-size: 17px;
            padding: 0 20px;
          }

          .reward-box {
            padding: 26px;
            border-radius: 32px;
          }

          .reward-main { font-size: 20px; }
          .reward-sub { font-size: 15px; }

          .add-btn {
            width: 60%;
            height: 62px;
            font-size: 20px;
            border-radius: 24px;
          }

          .nav-pill {
            height: 90px;
            border-radius: 34px;
          }

          .nav-item svg {
            width: 40px;
            height: 40px;
          }
        }

        /* ====================================================
           RESPONSIVE — DESKTOP (большие экраны / ПК)
        ======================================================*/
        @media (min-width: 1024px) {
          .new-screen {
            max-width: 480px;    /* оставляем форму телефона */
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #ececec;
          }
        }

      `}</style>

      <div className="new-screen">

        {/* === HEADER === */}
        <div className="header-zone">
          <div className="back-btn" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" stroke="#444" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="screen-title">Новая задача</div>
        </div>

        {/* === CENTER CONTENT === */}
        <div className="center-wrapper">

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
            </div>
          </div>

          <div className="reward-box">
            <div className="reward-icon">
              <svg viewBox="0 0 24 24">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
              </svg>
            </div>

            <div className="reward-text-group">
              <div className="reward-main">+12 ОД маленькая победа</div>
              <div className="reward-sub">Уменьшее свет одостонить</div>
            </div>
          </div>

          <button className="add-btn">Добавить</button>

        </div>

        {/* === NAVIGATION === */}
        <div className="nav-wrapper">
          <div className="nav-pill">

            <button className="nav-item" onClick={() => navigate("/home")}>
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
