import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Splash.css";
import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useTelegram } from "../../hooks/useTelegram";
import { useUserStore } from "../../store/userStore";
import { preloadImages } from "../../lib/preloadImages";

export default function Splash() {
  const { user: tgUser } = useTelegram();
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    function iosExpandHack() {
      try {
        tg?.expand();
        tg?.disableVerticalSwipes?.();
      } catch {}
    }

    iosExpandHack();
    setTimeout(iosExpandHack, 300);
    setTimeout(iosExpandHack, 1200);

    async function load() {
      if (!tgUser) return;

      try {
        await preloadImages();
      } catch {}

      const user = await findOrCreateUser(tgUser);
      if (!user) return;

      setUser(user);

      // имитация splash-паузы (как во втором варианте)
      await new Promise((r) => setTimeout(r, 2200));
      setReady(true);
    }

    load();
  }, [tgUser, setUser]);

  function handleStart() {
    if (!accepted) return;
    navigate("/home", { replace: true });
  }

  return (
    <section className="screen splash">
      <div className="splash-inner">

        {/* ===== ЗАГРУЗКА ===== */}
        {!ready && (
          <>
            <div className="splash-title">NSN</div>
            <div className="splash-line-wrap">
              <div className="splash-line" />
            </div>
          </>
        )}

        {/* ===== СОГЛАСИЕ ===== */}
        {ready && (
          <>
            <div className="splash-title">НАЧАТЬ С НАЧАЛА</div>

            <div className="splash-sub">
              Пространство мягких перезапусков
              <br />
              и маленьких шагов.
            </div>

            <div className="splash-card">
              <div
                className="consent-row"
                onClick={() => !accepted && setShowPolicy(true)}
                data-active={accepted}
              >
                <div className="circle">
                  {accepted && "✓"}
                </div>
                {accepted ? "Условия приняты" : "Условия не приняты"}
              </div>

              <button
                className={`start-btn ${accepted ? "active" : ""}`}
                disabled={!accepted}
                onClick={handleStart}
              >
                Начать
              </button>
            </div>
          </>
        )}
      </div>

      {/* ===== POLICY ===== */}
      {showPolicy && (
        <div className="overlay">
          <div className="policy">
            <h3>О данных и доверии</h3>
            <p>
              Используются только базовые данные:
              идентификатор, прогресс и действия.
              <br /><br />
              Данные не передаются третьим лицам
              и могут быть удалены по запросу.
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
    </section>
  );
}
