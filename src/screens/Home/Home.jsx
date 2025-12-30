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
        margin-top: 60px; /* ← вот это опускает блок уровнем + ОД */
        margin-bottom: 40px;
}


        .top-pill {
          width: 76%;
          max-width: 320px;
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
          width: 18px;
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

        /* ===================== EMPTY CONTENT ===================== */
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
          width: 76%;
          max-width: 320px;
          height: 62px;
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

        .nav-item img {
          width: 26px;
        }

        /* ===================== TABLETS ===================== */
        @media (min-width: 768px) {
          .home-screen {
            max-width: 640px;
            padding: 40px 40px;
          }

          .empty-img {
            width: 300px;
          }

          .content h2 {
            font-size: 26px;
          }

          .content p {
            font-size: 18px;
          }

          .primary-btn {
            width: 280px;
            height: 56px;
          }
        }

        /* ===================== DESKTOP ===================== */
        @media (min-width: 1024px) {
          .home-screen {
            max-width: 700px;
            border-radius: 24px;
          }

          .content h2 {
            font-size: 28px;
          }

          .content p {
            font-size: 20px;
          }

          .nav-pill {
            height: 70px;
          }

          .nav-item img {
            width: 30px;
          }
        }
      `}</style>

      <div className="home-screen">
        
        {/* TOP PILL */}
        <div className="top-pill-container">
          <div className="top-pill">
            <div className="left">
              <img src="/icons/flower.svg" className="icon" alt="lvl" />
              <span>Уровень 3</span>
            </div>

            <div className="separator"></div>

            <div className="right">
              <img src="/icons/energy.svg" className="icon" alt="energy" />
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
            <button className="nav-item active"><img src="/icons/home.svg" /></button>
            <button className="nav-item"><img src="/icons/steps.svg" /></button>
            <button className="nav-item"><img src="/icons/shop.svg" /></button>
            <button className="nav-item"><img src="/icons/profile.svg" /></button>
          </div>
        </div>

      </div>
    </>
  );
}
