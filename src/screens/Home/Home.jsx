import { useUserStore } from "../../store/userStore";

export default function Home() {
  const user = useUserStore((s) => s.user);

  return (
    <>
      <style>{`
        /* Убираем квадрат нажатия на телефонах */
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

        /* TOP PILL */
        .top-pill-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 60px;
          margin-bottom: 60px; /* одинаково как внизу */
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

        /* ================= CONTENT ================= */
        .content {
          text-align: center;
          margin-top: 0;
          margin-bottom: 0; /* чтобы было ровно по центру */
        }

        .empty-img {
          width: 270px;
          opacity: 0.95;
          margin-bottom: 25px;
        }

        .content h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
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

        /* NAVIGATION */
        .nav-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 60px; /* одинаковое расстояние как сверху */
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

        .nav-item:active svg {
          transform: scale(1.15);
        }
      `}</style>

      <div className="home-screen">
        
        {/* ================= TOP ================= */}
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

        {/* ================= CONTENT ================= */}
        <div className="content">
          <img className="empty-img" src="/images/clipboard.png" alt="empty" />
          <h2>У вас пока нет задач</h2>
          <p>Добавьте первую задачу, чтобы начать свой путь</p>
          <button className="primary-btn" onClick={() => navigate("/new-task")}>
            Добавить задачу
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
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
