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
          padding: 0;
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

              {/* TOP ICON — PROFILE */}
              <svg className="icon" fill="#6A6A6A" viewBox="0 0 24 24">
                <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2Zm0 12c4 0 8 2 8 5v2H4v-2c0-3 4-5 8-5Z"/>
              </svg>

              <span>Уровень 3</span>
            </div>

            <div className="separator"></div>

            <div className="right">

              {/* TOP ICON — ENERGY */}
              <svg className="icon" viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
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

            {/* HOME — selected */}
            <button className="nav-item active">
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0"/>
              </svg>
            </button>

            {/* STEPS — new clean version */}
            <button className="nav-item">
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M7 4c-1.8 0-3 1.2-3 3 0 2.4 2.2 6 3.2 6s3.2-3.6 3.2-6c0-1.8-1.2-3-3.4-3Z"/>
                <circle cx="7.5" cy="14.5" r="1.2"/>
                <path d="M16 9c-1.8 0-3 1.2-3 3 0 2.4 2.2 6 3.2 6s3.2-3.6 3.2-6c0-1.8-1.2-3-3.4-3Z"/>
                <circle cx="16.5" cy="18" r="1.2"/>
              </svg>
            </button>

            {/* SHOP — clean filled bag */}
            <button className="nav-item">
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M6 7h12c1.1 0 2 .9 2 2v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9c0-1.1.9-2 2-2Zm3-3a3 3 0 0 1 6 0v3H9V4Z"/>
              </svg>
            </button>

            {/* PROFILE */}
            <button className="nav-item">
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2Zm0 12c5 0 9 2.7 9 6v2H3v-2c0-3.3 4-6 9-6Z"/>
              </svg>
            </button>

          </div>
        </div>

      </div>
    </>
  );
}
