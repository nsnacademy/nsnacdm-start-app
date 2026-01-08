import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useTelegram } from "../../hooks/useTelegram";
import { useUserStore } from "../../store/userStore";
import { preloadImages } from "../../lib/preloadImages";

/* =========================
   DIAGNOSTIC LOGGER
   ========================= */
function logLayout(tag) {
  const vv = window.visualViewport;

  console.log(`🧭 LAYOUT — ${tag}`);
  console.log("window.innerWidth:", window.innerWidth);
  console.log("window.innerHeight:", window.innerHeight);

  console.log("html.clientWidth:", document.documentElement.clientWidth);
  console.log("html.scrollWidth:", document.documentElement.scrollWidth);

  console.log("body.clientWidth:", document.body.clientWidth);
  console.log("body.scrollWidth:", document.body.scrollWidth);
  console.log("body.offsetWidth:", document.body.offsetWidth);

  if (vv) {
    console.log("visualViewport.width:", vv.width);
    console.log("visualViewport.height:", vv.height);
    console.log("visualViewport.scale:", vv.scale);
  }

  const bodyStyle = getComputedStyle(document.body);
  console.log("body.background:", bodyStyle.background);
  console.log("body.fontFamily:", bodyStyle.fontFamily);
  console.log("body.overflowX:", bodyStyle.overflowX);

  console.log("––––––––––––––––––––––––––");
}

export default function Splash() {
  const { user: tgUser } = useTelegram();
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  const [phase, setPhase] = useState("loading"); // loading | consent
  const [accepted, setAccepted] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    function iosExpandHack() {
      try {
        tg?.requestFullscreen?.();
        tg?.expand();
        tg?.disableVerticalSwipes?.();
      } catch {}
    }

    iosExpandHack();
    logLayout("Splash mount");

    setTimeout(() => {
      iosExpandHack();
      logLayout("Splash expand +300ms");
    }, 300);

    setTimeout(() => {
      iosExpandHack();
      logLayout("Splash expand +1200ms");
    }, 1200);

    async function init() {
      if (!tgUser) return;

      try {
        await preloadImages();
      } catch {}

      const user = await findOrCreateUser(tgUser);
      if (!user) return;

      setUser(user);
      console.log("👤 USER SET IN STORE");
    }

    init();

    return () => {
      logLayout("Splash unmount (cleanup)");
    };
  }, [tgUser, setUser]);

  function handleStart() {
    if (!accepted) return;

    logLayout("Before navigate → /home");
    navigate("/home", { replace: true });
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        body {
          margin: 0;
          
          background: radial-gradient(circle at top, #F8F8F8 0, #f2f2f2 70%);
          color: #111;
        }

        .screen {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .inner {
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .title {
          font-size: 40px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0px;
        }

        .subtitle {
          font-size: 14px;
          color: #6a6a6a;
          line-height: 1.6;
        }

        .line-wrap {
          width: 140px;
          height: 3px;
          background: #e5e5e5;
          border-radius: 999px;
          overflow: hidden;
          margin-top: 16px;
        }

        .line {
          width: 100%;
          height: 100%;
          background: #111;
          transform-origin: left;
          animation: progress 3.6s linear forwards;
        }

        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .card {
          margin-top: 20px;
          width: 100%;
          background: #fff;
          border-radius: 16px;
          padding: 14px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .consent-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          cursor: pointer;
          user-select: none;
        }

        .circle {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
        }

        .circle.active {
          background: #111;
          border: none;
          color: #fff;
        }

        .start-btn {
          width: 100%;
          height: 40px;
          border-radius: 14px;
          border: none;
          font-size: 14px;
          transition: 0.2s ease;
        }

        .start-btn.disabled {
          background: #f0f0f0;
          color: #aaa;
        }

        .start-btn.active {
          background: #111;
          color: #fff;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: #f8f8f8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 10;
        }

        .policy {
          background: #fff;
          border-radius: 16px;
          padding: 16px;
          max-width: 320px;
          width: 100%;
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
          text-align: center;
        }

        .policy h3 {
          font-size: 15px;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .policy p {
          font-size: 13px;
          line-height: 1.6;
          color: #555;
        }

        .policy button {
          margin-top: 14px;
          width: 100%;
          height: 40px;
          border-radius: 14px;
          border: none;
          background: #111;
          color: #fff;
          font-size: 14px;
        }
      `}</style>

      {/* ===== ФАЗА ЗАГРУЗКИ ===== */}
      {phase === "loading" && (
        <div className="screen">
          <div className="inner">
            <div className="title">NSN</div>
            <div className="line-wrap">
              <div
                className="line"
                onAnimationEnd={() => {
                  logLayout("Loading animation end");
                  setPhase("consent");
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ===== ФАЗА СОГЛАСИЯ ===== */}
      {phase === "consent" && (
        <div className="screen">
          <div className="inner">
            <div className="title">НАЧАТЬ С НАЧАЛА</div>
            <div className="subtitle">Пространство маленьких шагов.</div>

            <div className="card">
              <div
                className="consent-row"
                onClick={() => !accepted && setShowPolicy(true)}
                style={{ color: accepted ? "#111" : "rgba(0,0,0,0.45)" }}
              >
                <div className={`circle ${accepted ? "active" : ""}`}>
                  {accepted ? "✓" : ""}
                </div>
                {accepted ? "Условия приняты" : "Условия не приняты"}
              </div>

              <button
                className={`start-btn ${accepted ? "active" : "disabled"}`}
                disabled={!accepted}
                onClick={handleStart}
              >
                Начать
              </button>
            </div>
          </div>

          {showPolicy && (
            <div className="overlay">
              <div className="policy">
                <h3>О данных и доверии</h3>

                <p>
                  Это приложение не собирает ничего лишнего.
                  <br /><br />
                  Используются только базовые данные:
                  идентификатор, прогресс и действия.
                  <br /><br />
                  Данные не передаются третьим лицам
                  и не используются для рекламы.
                  <br /><br />
                  Проект создаётся с вниманием.
                  При необходимости данные будут удалены.
                </p>

                <button
                  onClick={() => {
                    setAccepted(true);
                    setShowPolicy(false);
                  }}
                >
                  Я согласен
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
