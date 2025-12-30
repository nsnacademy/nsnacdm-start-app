export default function Home() {
  return (
    <>
      <style>{`
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

        /* ===================== TOP PILL ===================== */
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
          width: 20px;
          height: 20px;
          opacity: 0.85;
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

        /* ===================== EMPTY ===================== */
        .content {
          text-align: center;
          margin-top: -20px;
        }

        .empty-img {
          width: 200px;
          opacity: 0.95;
          margin-bottom: 10px;
        }

        .content h2 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .content p {
          font-size: 16px;
          opacity: 0.55;
          margin-bottom: 26px;
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

        /* ===================== NAVIGATION ===================== */
        .nav-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .nav-pill {
          width: 82%;
          max-width: 480px;
          height: 75px;
          background: #ffffff;
          border-radius: 28px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);

          display: flex;
          justify-content: space-between;
          align-items: center;

          padding: 0 26px;
        }

        .nav-item {
          border: none;
          background: none;
          opacity: 0.45;
        }

        .nav-item.active {
          opacity: 1;
        }

        .nav-item svg {
          width: 32px;
          height: 32px;
        }

      `}</style>

      <div className="home-screen">
        
        {/* TOP */}
        <div className="top-pill-container">
          <div className="top-pill">
            <div className="left">

              {/* HOME ICON (HEROICONS SOLID) */}
              <svg className="icon" fill="#6A6A6A" viewBox="0 0 24 24">
                <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1-1.06 1.06L18 11.56V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7.44l-.97 1.84a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"/>
              </svg>

              <span>Уровень 3</span>
            </div>

            <div className="separator"></div>

            <div className="right">

              {/* PROFILE ICON */}
              <svg className="icon" fill="#6A6A6A" viewBox="0 0 24 24">
                <path d="M12 2a6 6 0 1 1 0 12A6 6 0 0 1 12 2Zm0 14c5 0 9 2.5 9 6v1H3v-1c0-3.5 4-6 9-6Z"/>
              </svg>

              <span>120 ОД</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          <img className="empty-img" src="/images/clipboard.png" alt="empty" />

          <h2>У вас пока нет задач</h2>
          <p>Добавьте первую задачу, чтобы начать свой путь</p>

          <button className="primary-btn">Добавить задачу</button>
        </div>

        {/* NAVIGATION */}
        <div className="nav-wrapper">
          <div className="nav-pill">

            {/* HOME */}
            <button className="nav-item active">
              <svg fill="#6A6A6A" viewBox="0 0 24 24">
                <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1-1.06 1.06L18 11.56V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7.44l-.97 1.84a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"/>
              </svg>
            </button>

            {/* STEPS — CUSTOM */}
            <button className="nav-item">
              <svg fill="#6A6A6A" viewBox="0 0 24 24">
                <path d="M7 5.5C5.8 5.5 5 6.4 5 7.6C5 9.2 6.6 12 7.3 12C7.9 12 9.5 9.2 9.5 7.6C9.5 6.4 8.3 5.5 7 5.5Z"/>
                <circle cx="7.4" cy="13.5" r="1.2"/>
                <path d="M15 10C13.8 10 13 10.9 13 12.1C13 13.7 14.5 16.5 15.2 16.5C15.8 16.5 17.4 13.7 17.4 12.1C17.4 10.9 16.2 10 15 10Z"/>
                <circle cx="15.3" cy="18" r="1.2"/>
              </svg>
            </button>

            {/* SHOP */}
            <button className="nav-item">
              <svg fill="none" stroke="#6A6A6A" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="4" y="7" width="16" height="14" rx="3"/>
                <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>

            {/* PROFILE */}
            <button className="nav-item">
              <svg fill="#6A6A6A" viewBox="0 0 24 24">
                <path d="M12 2a6 6 0 1 1 0 12A6 6 0 0 1 12 2Zm0 14c5 0 9 2.5 9 6v1H3v-1c0-3.5 4-6 9-6Z"/>
              </svg>
            </button>

          </div>
        </div>

      </div>
    </>
  );
}
