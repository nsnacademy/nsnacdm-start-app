import { useEffect } from "react";
import "./Splash.css";
import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useTelegram } from "../../hooks/useTelegram";
import { useUserStore } from "../../store/userStore";
import { preloadImages } from "../../lib/preloadImages"; // 👈 ДОБАВИЛИ

export default function Splash() {
  const { user: tgUser } = useTelegram();
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    function iosExpandHack() {
      try {
        tg?.requestFullscreen?.();
        tg?.expand();
        tg?.disableVerticalSwipes?.();
      } catch (e) {
        console.log("iOS fullscreen error:", e);
      }
    }

    iosExpandHack();
    setTimeout(iosExpandHack, 300);
    setTimeout(iosExpandHack, 1200);

    async function load() {
      if (!tgUser) return;

      console.log("TG USER:", tgUser);

      // 🔥 ПРЕДЗАГРУЗКА ВСЕХ КАРТИНОК
      try {
        await preloadImages();
      } catch (e) {
        console.log("Image preload error:", e);
      }

      const user = await findOrCreateUser(tgUser);
      if (!user) return;

      setUser(user);

      // ⏳ оставляем твою задержку (Splash ощущение)
      await new Promise((res) => setTimeout(res, 3200));

      if (user.has_onboarded === true) {
        window.location.href = "/home";
      } else {
        window.location.href = "/intro";
      }
    }

    load();
  }, [tgUser, setUser]);

  return (
    <section className="screen splash">
      <div className="splash-inner">
        <div className="splash-title">НАЧАТЬ С НАЧАЛА</div>

        <div className="splash-sub">
          Пространство мягких перезапусков и маленьких шагов.
        </div>

        <div className="splash-line-wrap">
          <div className="splash-line"></div>
        </div>

        {/* Минималистичная кнопка пропуска */}
        <button
          className="skip-btn"
          onClick={() => (window.location.href = "/home")}
        >
          Пропустить вступление →
        </button>
      </div>
    </section>
  );
}
