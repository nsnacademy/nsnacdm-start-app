import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export default function NewTask() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);

  const [title, setTitle] = useState("");
  const [selectedTime, setSelectedTime] = useState(10);

  const times = [5, 10, 20, 25, 30];

  return (
    <>
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }

        body {
          background: #f4f4f4;
        }

        .screen {
          width: 100%;
          height: 100vh;
          max-width: 520px;
          margin: 0 auto;

          background: #f5f5f5;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          padding: calc(env(safe-area-inset-top) + 34px) 20px 28px;
          box-sizing: border-box;
        }

        /* TOP TITLE */
        .header-title {
          font-size: 20px;
          font-weight: 600;
          width: 100%;
          text-align: center;
          margin-bottom: 20px;
        }

        .back-btn {
          position: absolute;
          left: 24px;
          top: calc(env(safe-area-inset-top) + 34px);
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        .back-btn svg {
          width: 22px;
          height: 22px;
          stroke: #222;
        }

        /* ТОЧНО КАК В HOME */
        .content-block {
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
}

        

        /* INPUT CARD */
        .input-card {
          background: #ffffff;
          border-radius: 26px;
          padding: 22px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          margin-bottom: 26px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-field {
          width: 100%;
          height: 50px;
          border-radius: 16px;
          background: #f2f2f2;
          border: none;
          padding: 0 44px 0 18px;
          font-size: 16px;
        }

        .clear-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .clear-btn svg {
          width: 14px;
          height: 14px;
          stroke: #777;
        }

        .time-label {
          margin-top: 20px;
          font-size: 15px;
          font-weight: 500;
          margin-bottom: 14px;
        }

        /* TIME BUTTON GRID */
        .time-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .time-btn {
          height: 44px;
          border-radius: 14px;
          border: 1px solid #e6e6e6;
          background: #fafafa;
          font-size: 15px;
          transition: all .2s;
        }

        .time-btn.active {
          background: #222;
          color: #fff;
          border-color: #222;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }

        /* REWARD CARD */
        .reward-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 18px 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);

          display: flex;
          gap: 14px;
          align-items: center;

          margin-bottom: 40px;
        }

        .reward-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: #ededed;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reward-icon-box svg {
          width: 22px;
          height: 22px;
          fill: #bfbfbf;
        }

        .reward-main-text {
          font-size: 16px;
          font-weight: 600;
        }

        .reward-sub-text {
          font-size: 13px;
          color: #999;
        }

        /* ADD BUTTON (rounded pill) */
        .primary-btn {
          width: 100%;
          max-width: 280px;
          height: 54px;
          border: none;
          border-radius: 28px;
          background: linear-gradient(180deg, #333, #0f0f0f);
          color: white;
          font-size: 17px;
          font-weight: 500;
          box-shadow: 0 8px 24px rgba(0,0,0,0.20);
        }

        /* NAVIGATION */
        .nav-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }

        .nav-pill {
          width: 100%;
          max-width: 520px;
          height: 78px;
          background: white;
          border-radius: 30px;
          box-shadow: 0 6px 26px rgba(0,0,0,0.12);

          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 34px;
        }

        .nav-item {
          opacity: 0.40;
          border: none;
          background: none;
        }

        .nav-item.active {
          opacity: 1;
        }

        .nav-item svg {
          width: 30px;
          height: 30px;
        }
      `}</style>

      <div className="screen">

        {/* BACK */}
        <div className="back-btn" onClick={() => navigate("/home")}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>

        {/* TITLE */}
        <div className="header-title">Новая задача</div>

        {/* CONTENT AREA */}
        <div className="content-block">

          {/* INPUT CARD */}
          <div className="input-card">

            <div className="input-wrapper">
              <input
                className="input-field"
                placeholder="Введите задачу"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {title.length > 0 && (
                <div className="clear-btn" onClick={() => setTitle("")}>
                  <svg viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            <div className="time-label">Запланированное время</div>

            <div className="time-grid">
              {times.map((t) => (
                <button
                  key={t}
                  className={`time-btn ${selectedTime === t ? "active" : ""}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {t} мин
                </button>
              ))}
              <button className="time-btn">Другое</button>
            </div>
          </div>

          {/* REWARD */}
          <div className="reward-card">
            <div className="reward-icon-box">
              <svg viewBox="0 0 24 24">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
              </svg>
            </div>

            <div>
              <div className="reward-main-text">+12 ОД маленькая победа</div>
              <div className="reward-sub-text">Уменьшение свет одостоинь</div>
            </div>
          </div>

          <button className="primary-btn">Добавить</button>
        </div>

        {/* NAVIGATION */}
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
