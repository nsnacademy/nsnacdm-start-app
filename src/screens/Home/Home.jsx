import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useTaskStore } from "../../store/taskStore";
import { useState, useEffect } from "react";
import TaskTimer from "../Step/TaskTimer";

export default function Home() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  console.log("🏠 HOME USER:", user);

  useEffect(() => {
    if (!user) return;
    console.log("📊 XP:", user.hp, "/", hpToNextLevel(user.level));
  }, [user]);

  const LEVELS = [
    { level: 1, from: 0, to: 150 },
    { level: 2, from: 150, to: 370 },
    { level: 3, from: 370, to: 656 },
    { level: 4, from: 656, to: 1028 },
    { level: 5, from: 1028, to: 1511 },
    { level: 6, from: 1511, to: 2139 },
    { level: 7, from: 2139, to: 2955 },
    { level: 8, from: 2955, to: 4016 },
    { level: 9, from: 4016, to: 5395 },
    { level: 10, from: 5395, to: 7189 },
  ];

  const hp = user?.hp ?? 0;

  const currentLevel =
    LEVELS.find((l) => hp >= l.from && hp < l.to) ||
    LEVELS[LEVELS.length - 1];

  const progress =
    ((hp - currentLevel.from) / (currentLevel.to - currentLevel.from)) * 100;

  const safeProgress = Math.min(Math.max(progress, 0), 100);

  const tasks = useTaskStore((s) => s.tasks);
  const removeTask = useTaskStore((s) => s.removeTask);
  const startTask = useTaskStore((s) => s.startTask);
  const activeTask = useTaskStore((s) => s.activeTask);

  const hpToNextLevel = (level) => {
    return Math.round(100 * Math.pow(1.35, level - 1));
  };

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  if (activeTask) {
    return <TaskTimer task={activeTask} />;
  }

  return (
    <>
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        /* ===== SCREEN (1:1 как Steps) ===== */
        .home-screen {
          width: 100%;
          min-height: 100vh;
          background: #f8f8f8;
        

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          padding: calc(env(safe-area-inset-top) + 40px) 20px 30px;
          box-sizing: border-box;
          max-width: min(520px, 100%);

          margin: 0 auto;
        }

        /* ===== TOP PILL (1:1 как Steps) ===== */
        .top-pill-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 60px;
          margin-bottom: 40px;
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

        /* ===== CONTENT ===== */
        .content {
          width: 79%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }


        
        .empty-img {
          width: 250px;
          opacity: 0.95;
          
        }

        .content h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: -10px;
        }

        .content p {
          font-size: 16px;
          opacity: 0.55;
          margin-bottom: 20px;
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
          max-width: 480px;
          background: #ffffff;
          border-radius: 28px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.06);
          position: relative;
          margin: 0 auto;
          overflow: hidden;
        }

        .task-start {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #f1f1f1;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
        }

        .task-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
        }

        .task-title {
          font-size: 16px;
          font-weight: 600;
          line-height: 1.25;
          overflow-wrap: anywhere;
          word-break: break-word;
          white-space: normal;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          text-align: left;
        }

        .task-sub {
          font-size: 13px;
          opacity: 0.55;
          font-weight: 400;
          text-align: left;
        }

        .task-menu {
          flex-shrink: 0;
          font-size: 22px;
          opacity: 0.6;
          padding: 4px;
          cursor: pointer;
        }

        .popup-menu {
          position: absolute;
          top: 10px;
          right: 18px;
          background: #fff;
          padding: 12px 18px;
          border-radius: 14px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          z-index: 10;
        }

        .popup-delete {
          color: #ff4d4d;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-align: right;
        }

        /* ===== NAV (1:1 как Steps) ===== */
        .nav-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 59px;
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
          background: #ffffff;
          opacity: 0.45;
          padding: 0;
          transition: 
            transform 0.22s cubic-bezier(.25,.46,.45,.94),
            opacity .2s ease;
          cursor: pointer;
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

        .nav-item:active svg {
          transform: scale(1.15);
        }
      `}</style>

      <div className="home-screen">
        {/* TOP */}
        <div className="top-pill-container">
          <div className="top-pill">
            <div className="left">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                stroke="#6A6A6A"
                fill="none"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
              <span>Уровень {currentLevel.level}</span>
            </div>

            <div className="separator">
              <div
                style={{
                  width: `${safeProgress}%`,
                  height: "100%",
                  background: "#ffc400",
                  borderRadius: "2px",
                  transition: "width 0.35s ease",
                }}
              />
            </div>

            <div className="right">
              <svg className="icon" viewBox="0 0 24 24" fill="#FFC400">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
              <span>{user?.od ?? 0} Од</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          {tasks.length === 0 ? (
            <>
              <img
                className="empty-img"
                src="/images/clipboard.png"
                alt="empty"
              />
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
              <button
                className="task-start"
                onClick={() => startTask(tasks[0])}
              >
                ▶
              </button>

              <div className="task-info">
                <div className="task-title">{tasks[0].title}</div>
                <div className="task-sub">
                  +{tasks[0].od} ОД • {tasks[0].hp} xp
                </div>
              </div>

              <div
                className="task-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
              >
                ⋯
              </div>

              {menuOpen && (
                <div className="popup-menu">
                  <div
                    className="popup-delete"
                    onClick={() => removeTask(tasks[0].id)}
                  >
                    Удалить
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* NAV */}
        <div className="nav-wrapper">
          <div className="nav-pill">
            <button
              className="nav-item active"
              onClick={() => navigate("/home")}
            >
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M12 3l8 7v10a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1V10l8-7z" />
              </svg>
            </button>

            <button className="nav-item" onClick={() => navigate("/steps")}>
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M8 4c-2 0-3.3 1.4-3.3 3.5 0 2.4 2.4 6.2 3.5 6.2S12 10 12 7.5C12 5.4 10.3 4 8 4Z" />
                <circle cx="8.5" cy="14.8" r="1.3" />
                <path d="M16 9c-2 0-3.3 1.4-3.3 3.5 0 2.4 2.4 6.2 3.5 6.2s3.8-3.7 3.8-6.2C20 10.4 18.3 9 16 9Z" />
                <circle cx="16.6" cy="18.5" r="1.3" />
              </svg>
            </button>

            <button className="nav-item" onClick={() => navigate("/shop")}>
              <svg
                viewBox="0 0 24 24"
                stroke="#6A6A6A"
                fill="none"
                strokeWidth="2"
              >
                <rect x="4" y="7" width="16" height="13" rx="3" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
            </button>

            <button className="nav-item">
              <svg
                viewBox="0 0 24 24"
                stroke="#6A6A6A"
                fill="none"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}