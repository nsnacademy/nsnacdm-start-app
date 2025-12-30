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
        
        {/* TOP PILL */}
        <div className="top-pill-container">
          <div className="top-pill">

            {/* LEFT */}
            <div className="left">

              {/* BEAUTIFUL PROFILE ICON */}
              <svg className="icon" fill="#6A6A6A" viewBox="0 0 24 24">
                <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2Zm0 12c4 0 8 2 8 5v2H4v-2c0-3 4-5 8-5Z"/>
              </svg>

              <span>Уровень 3</span>
            </div>

            <div className="separator"></div>

            {/* RIGHT */}
            <div className="right">

              {/* YELLOW ENERGY */}
              <svg className="icon" viewBox="0 0 24 24" fill="#FFC400">
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

            {/* HOME */}
            <button className="nav-item active">
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M12 3l9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11l9-8z"/>
              </svg>
            </button>

            {/* STEPS — new beautiful */}
            <button className="nav-item">
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M7.2 4c-1.7 0-2.9 1.1-2.9 2.8 0 2.3 2.1 5.7 3 5.7s3-3.4 3-5.7C10.3 5.1 9 4 7.2 4z"/>
                <circle cx="7.4" cy="14.5" r="1.2"/>
                <path d="M16.4 9c-1.7 0-2.9 1.1-2.9 2.8 0 2.3 2.1 5.7 3 5.7s3-3.4 3-5.7C19.5 10.1 18.2 9 16.4 9z"/>
                <circle cx="16.6" cy="18" r="1.2"/>
              </svg>
            </button>

            {/* SHOP — modern clean bag */}
            <button className="nav-item">
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M6 7h12a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2zm3-3a3 3 0 0 1 6 0v3H9V4z"/>
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
