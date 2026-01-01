import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useTaskStore } from "../../store/taskStore";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const tasks = useTaskStore((s) => s.tasks);
  const removeTask = useTaskStore((s) => s.removeTask);

  const [menuOpen, setMenuOpen] = useState(false);

  // Закрывать меню по клику вне
  useEffect(() => {
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <>
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }

        .home-screen {
          width: 100%;
          height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          padding: calc(env(safe-area-inset-top) + 40px) 20px 30px;
          box-sizing: border-box;
          max-width: 520px;
          margin: 0 auto;
        }

        /* ====== TOP PILL ====== */

        .top-pill-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 60px;
          margin-bottom: 60px;
        }

        .top-pill {
          width: 82%;
          max-width: 480px;
          height: 48px;
          background: #fff;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }

        .left, .right {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #555;
        }

        .icon {
          width: 22px;
          height: 22px;
          opacity: 0.9;
        }

        .separator {
          flex: 1;
          height: 4px;
          max-width: 90px;
          background: #d4d4d4;
          border-radius: 2px;
          margin: 0 14px;
          opacity: 0.55;
        }

        /* ===== CONTENT WRAPPER ===== */

        .content {
          width: 100%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .empty-img {
          width: 270px;
          opacity: 0.95;
          margin-bottom: 25px;
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

        /* ===== TASK CARD ===== */

        .task-card {
          width: 92%;
          max-width: 520px;
          background: #fff;
          padding: 22px 24px;
          border-radius: 24px;
          box-shadow: 0 8px 22px rgba(0,0,0,0.06);

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;

          position: relative;
        }

        .task-start {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #efefef;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
        }

        .task-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: left;
          gap: 4px;
        }

        .task-title {
          font-size: 18px;
          font-weight: 600;
          word-break: break-word;
        }

        .task-sub {
          font-size: 14px;
          opacity: 0.6;
          white-space: nowrap;
        }

        .task-menu {
          font-size: 32px;
          padding: 8px 12px;
          cursor: pointer;
          opacity: 0.7;
        }

        /* ===== DELETE MENU ===== */

        .popup-menu {
          position: absolute;
          top: 18px;
          right: 20px;
          width: 120px;
          padding: 12px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          z-index: 10;
          animation: fadeIn .15s ease forwards;
        }

        .menu-item {
          font-size: 15px;
          font-weight: 500;
          color: #ff4d4d;
          cursor: pointer;
          text-align: right;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ===== NAVIGATION ===== */

        .nav-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 60px;
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

        .nav-item svg {
          width: 32px;
          height: 32px;
        }

        .nav-item.active {
          opacity: 1;
        }
      `}</style>

      <div className="home-screen">

        {/* ========= TOP ========= */}
        <div className="top-pill-container">
          <div className="top-pill">
            <div className="left">
              <svg className="icon" viewBox="0 0 24 24" stroke="#6A6A6A" fill="none" strokeWidth="2">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
              </svg>
              <span>Уровень {user?.level ?? 1}</span>
            </div>

            <div className="separator"></div>

            <div className="right">
              <svg className="icon" viewBox="0 0 24 24" fill="#FFC400">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
              </svg>
              <span>{user?.od ?? 0} ОД</span>
            </div>
          </div>
        </div>

        {/* ========= CONTENT ========= */}
        <div className="content">
          {tasks.length === 0 ? (
            <>
              <img className="empty-img" src="/images/clipboard.png" alt="empty" />
              <h2>У вас пока нет задач</h2>
              <p>Добавьте первую задачу, чтобы начать свой путь</p>

              <button
                className="primary-btn"
                onClick={() => navigate("/new-task")}
              >
                Добавить задачу
              </button>
            </>
          ) : (
            <div className="task-card">

              {/* Start */}
              <button
                className="task-start"
                onClick={() => navigate("/timer")}
              >
                ▶
              </button>

              {/* Text */}
              <div className="task-info">
                <div className="task-title">{tasks[0].title}</div>
                <div className="task-sub">
                  +{tasks[0].od} ОД • {tasks[0].hp} xp
                </div>
              </div>

              {/* Three dots */}
              <div
                className="task-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
              >
                ⋯
              </div>

              {/* Popup delete menu */}
              {menuOpen && (
                <div className="popup-menu" onClick={(e) => e.stopPropagation()}>
                  <div
                    className="menu-item"
                    onClick={() => {
                      removeTask(tasks[0].id);
                      setMenuOpen(false);
                    }}
                  >
                    Удалить
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========= NAVIGATION ========= */}
        <div className="nav-wrapper">
          <div className="nav-pill">
            <button className="nav-item active">
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

            <button className="nav-item">
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
