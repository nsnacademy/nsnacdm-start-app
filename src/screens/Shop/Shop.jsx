import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export default function Shop() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);

  /* ===== LEVEL SYSTEM (НЕ ТРОГАЕМ) ===== */

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
    ((hp - currentLevel.from) /
      (currentLevel.to - currentLevel.from)) *
    100;

  const safeProgress = Math.min(Math.max(progress, 0), 100);

  // уровень, с которого открывается разбор
    const REQUIRED_LEVEL = 3;

// hp, с которого начинается 3 уровень (370)
    const REQUIRED_HP = LEVELS.find(l => l.level === REQUIRED_LEVEL).from;

// можно ли обращаться
    const canRequestFounder = hp >= REQUIRED_HP;

// сколько hp осталось
    const hpLeft = Math.max(REQUIRED_HP - hp, 0);

    


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

        .screen {
          width: 100%;
          height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          padding: calc(env(safe-area-inset-top) + 40px) 20px 30px;
          max-width: 520px;
          margin: 0 auto;
        }

        /* ===== TOP PILL ===== */
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
          width: 100%;
        }

        .card {
          background: #fff;
          border-radius: 22px;
          padding: 18px;
          margin-bottom: 16px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.06);
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title {
          font-size: 15px;
          font-weight: 500;
        }

        .sub {
          margin-top: 4px;
          font-size: 12px;
          color: #777;
        }

        .soon {
          background: #f8f8f8;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          color: #222;
        }

        .divider {
          height: 1px;
          background: #eee;
          margin: 14px 0;
        }

        .btn {
          width: 100%;
          height: 46px;
          border-radius: 16px;
          border: none;
          background: #f8f8f8;
          color: #222;
          font-size: 15px;
        }

        .hint {
          margin-top: 8px;
          text-align: center;
          font-size: 12px;
          color: #999;
        }

        .free-btn {
          border: none;
          background: #222;
          color: #f8f8f8;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 14px;
          cursor: pointer;
          white-space: nowrap;
        }

        /* ===== NAV ===== */
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
        }

        .nav-item.active {
          opacity: 1;
        }

        .nav-item svg {
          width: 32px;
          height: 32px;
        }
      `}</style>

      <div className="screen">

        {/* ===== TOP PILL ===== */}
        <div className="top-pill-container">
          <div className="top-pill">
            <div className="left">
              <svg className="icon" viewBox="0 0 24 24" stroke="#6A6A6A" fill="none" strokeWidth="2">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
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
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
              </svg>
              <span>{user?.od ?? 0} Од</span>
            </div>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="content">

          {/* 🔥 ЛИД-МАГНИТ */}
          <div className="card">
            <div className="row">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "#ececec",
                    color: "#555",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  ●
                </div>

                <div>
                  <div className="title">Первый шаг</div>
                  <div className="sub">С чего все начинается</div>
                </div>
              </div>

              <button
  className="free-btn"
  onClick={() => navigate("/first-step")}
>
  Бесплатно
</button>

            </div>
          </div>


                  {/* 🧠 ГЛУБОКИЙ РАЗБОР */}
<div className="card">
  <div className="row">
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#ececec",
          color: "#555",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        ●
      </div>

      <div>
        <div className="title">Разобраться в состоянии</div>
        <div className="sub">Когда внутри тяжело и непонятно, что делать</div>
      </div>
    </div>

    <button
      className="free-btn"
      style={{
        background: "#222",
        color: "#f8f8f8",
      }}
      onClick={() => navigate("/help")}
    >
      100 Од
    </button>
  </div>
</div>



          {/* ===== ВТОРОЙ ПРОДУКТ (НЕ ТРОГАЕМ) ===== */}
          {/* ===== ВТОРОЙ ПРОДУКТ ===== */}
<div className="card">
  <div className="row">
    <div className="title">Разбор. Начать с начала</div>
    <div className="soon">Доступ с 3 уровня</div>
  </div>

  <div className="sub" style={{ marginTop: 10 }}>
    Когда ты делаешь шаги,  
    но не чувствуешь движения
  </div>

  <div className="divider" />

     
    {canRequestFounder ? (
  <>
    <button
      className="btn"
      style={{ background: "#222", color: "#fff" }}
      onClick={() => navigate("/founder-request")}
    >
      Обратиться к основателю
    </button>

    <div className="hint">
      Доступ открыт
    </div>
  </>
) : (
  <>
    <button
      className="btn"
      disabled
      style={{ opacity: 0.5 }}
    >
      Обратиться к основателю
    </button>

    <div className="hint">
      Осталось {hpLeft} HP до открытия.
    </div>
  </>
)}



</div>

        </div>

        {/* ===== NAV ===== */}
        <div className="nav-wrapper">
          <div className="nav-pill">
            <button className="nav-item" onClick={() => navigate("/home")}>
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M12 3l8 7v10a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1V10l8-7z"/>
              </svg>
            </button>

            <button className="nav-item" onClick={() => navigate("/steps")}>
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

            <button
  className="nav-item"
  onClick={() => navigate("/profile")}
>
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
