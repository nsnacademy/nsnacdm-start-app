import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useTelegram } from "../../hooks/useTelegram";
import { useUserStore } from "../../store/userStore";
import { preloadImages } from "../../lib/preloadImages";

/* ================================
   VIEWPORT DEBUG HELPER
================================ */
function logViewport(label) {
  const vv = window.visualViewport;

  console.group(`🧭 VIEWPORT LOG — ${label}`);

  console.log("window.innerWidth:", window.innerWidth);
  console.log("window.innerHeight:", window.innerHeight);

  console.log(
    "documentElement.clientWidth:",
    document.documentElement.clientWidth
  );
  console.log(
    "documentElement.clientHeight:",
    document.documentElement.clientHeight
  );

  if (vv) {
    console.log("visualViewport.width:", vv.width);
    console.log("visualViewport.height:", vv.height);
    console.log("visualViewport.scale:", vv.scale);
  } else {
    console.log("visualViewport: ❌ not supported");
  }

  console.log("body.clientWidth:", document.body.clientWidth);
  console.log("body.offsetWidth:", document.body.offsetWidth);

  const safeTop = getComputedStyle(document.documentElement)
    .getPropertyValue("env(safe-area-inset-top)");

  console.log("safe-area-top:", safeTop || "n/a");

  console.groupEnd();
}

export default function Splash() {
  const { user: tgUser } = useTelegram();
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  const [phase, setPhase] = useState("loading"); // loading | consent
  const [accepted, setAccepted] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const styleRef = useRef(null);

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
    logViewport("Splash mounted — after expand");

    const t1 = setTimeout(() => {
      iosExpandHack();
      logViewport("Splash expand t+300ms");
    }, 300);

    const t2 = setTimeout(() => {
      iosExpandHack();
      logViewport("Splash expand t+1200ms");
    }, 1200);

    async function init() {
      if (!tgUser) return;

      try {
        await preloadImages();
      } catch {}

      const user = await findOrCreateUser(tgUser);
      if (!user) return;

      setUser(user);
    }

    init();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);

      logViewport("Splash unmount (cleanup)");

      setShowPolicy(false);

      try {
        tg?.expand?.();
      } catch {}

      if (styleRef.current) {
        styleRef.current.remove();
      }
    };
  }, [tgUser, setUser]);

  function handleStart() {
    if (!accepted) return;

    logViewport("Before navigate → /home");

    requestAnimationFrame(() => {
      navigate("/home", { replace: true });
    });
  }

  return (
    <>
      <style ref={styleRef}>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
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
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 8px;
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
      `}</style>

      {phase === "loading" && (
        <div className="screen">
          <div className="inner">
            <div className="title">NSN</div>
            <div className="line-wrap">
              <div
                className="line"
                onAnimationEnd={() => setPhase("consent")}
              />
            </div>
          </div>
        </div>
      )}

      {phase === "consent" && (
        <div className="screen">
          <div className="inner">
            <div className="title">НАЧАТЬ С НАЧАЛА</div>
            <div className="subtitle">
              Пространство мягких перезапусков
              <br />
              и маленьких шагов.
            </div>

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
