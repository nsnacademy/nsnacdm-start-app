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

        .screen {
          width: 100%;
          height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          padding: calc(env(safe-area-inset-top) + 40px) 20px 30px;
          box-sizing: border-box;

          max-width: 520px;
          margin: 0 auto;
        }

        .back {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          margin-bottom: 20px;
        }

        .back svg {
          width: 26px;
          height: 26px;
        }

        .page-center {
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .title {
          font-size: 24px;
          font-weight: 700;
        }

        .input-block {
          width: 100%;
          background: #ffffff;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.05);
        }

        .input-field {
          width: 100%;
          height: 52px;
          border-radius: 14px;
          border: none;
          background: #f1f1f1;
          padding: 0 16px;
          font-size: 16px;
          margin-bottom: 25px;
        }

        .time-label {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .time-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .time-btn {
          height: 44px;
          border-radius: 14px;
          border: none;
          font-size: 15px;
          background: #f1f1f1;
          opacity: 0.9;
        }

        .time-btn.active {
          background: #222;
          color: #fff;
          opacity: 1;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .reward-block {
          width: 100%;
          background: #ffffff;
          padding: 16px 20px;
          border-radius: 18px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.05);

          display: flex;
          align-items: center;
          gap: 12px;
        }

        .reward-icon {
          width: 42px;
          height: 42px;
          background: #ececec;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .reward-icon svg {
          width: 22px;
          height: 22px;
        }

        .reward-text-1 {
          font-size: 16px;
          font-weight: 600;
        }

        .reward-text-2 {
          font-size: 14px;
          opacity: 0.55;
          margin-top: -2px;
        }

        .primary-btn {
          width: 240px;
          height: 52px;
          border: none;
          border-radius: 16px;
          background: #222;
          color: white;
          font-size: 17px;
          box-shadow: 0 6px 14px rgba(0,0,0,0.15);
        }

        /* === НАВИГАЦИЯ КАК В ТВОЁМ HOME === */

        .nav-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 40px;
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

      <div className="screen">

        {/* TOP BACK */}
        <div className="back" onClick={() => navigate("/home")}>
          <svg viewBox="0 0 24 24" stroke="#000" fill="none" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>Назад</span>
        </div>

        {/* CENTER */}
        <div className="page-center">

          <div className="title">Новая задача</div>

          <div className="input-block">
            <input
              className="input-field"
              placeholder="Введите задачу"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

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

          <div className="reward-block">
            <div className="reward-icon">
              <svg viewBox="0 0 24 24" fill="#FFC400">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </div>

            <div>
              <div className="reward-text-1">+12 ОД маленькая победа</div>
              <div className="reward-text-2">Увеличение энергии</div>
            </div>
          </div>

          <button className="primary-btn">
            Добавить
          </button>

        </div>

        {/* === НАВИГАЦИЯ — ТОЧЬ В ТОЧЬ КАК В HOME === */}
        <div className="nav-wrapper">
          <div className="nav-pill">

            {/* 1 — Дом */}
            <button className="nav-item" onClick={() => navigate("/home")}>
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M12 3l8 7v10a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1V10l8-7z"/>
              </svg>
            </button>

            {/* 2 — Категории */}
            <button className="nav-item">
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M8 4c-2 0-3.3 1.4-3.3 3.5 0 2.4 2.4 6.2 3.5 6.2S12 10 12 7.5C12 5.4 10.3 4 8 4Z"/>
                <circle cx="8.5" cy="14.8" r="1.3"/>
                <path d="M16 9c-2 0-3.3 1.4-3.3 3.5 0 2.4 2.4 6.2 3.5 6.2s3.8-3.7 3.8-6.2C20 10.4 18.3 9 16 9Z"/>
                <circle cx="16.6" cy="18.5" r="1.3"/>
              </svg>
            </button>

            {/* 3 — Текущая страница (замок) */}
            <button className="nav-item active">
              <svg viewBox="0 0 24 24" stroke="#6A6A6A" fill="none" strokeWidth="2">
                <rect x="4" y="7" width="16" height="13" rx="3"/>
                <path d="M9 7V5a3 3 0 0 1 6 0v2"/>
              </svg>
            </button>

            {/* 4 — Профиль */}
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
