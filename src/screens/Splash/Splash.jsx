import { useEffect } from "react";
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

      // небольшая пауза для ощущения загрузки
      await new Promise((res) => setTimeout(res, 5000));

      navigate("/home", { replace: true });
    }

    load();
  }, [tgUser, setUser, navigate]);

  return (
    <section className="screen splash">
      <div className="splash-inner">
        <div className="splash-title">NSN</div>

        <div className="splash-line-wrap">
          <div className="splash-line" />
        </div>

        <button
          className="skip-btn"
          onClick={() => navigate("/home", { replace: true })}
        >
          Пропустить →
        </button>
      </div>
    </section>
  );
}
