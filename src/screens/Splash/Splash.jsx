import { useEffect } from "react";
import "./Splash.css";
import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useTelegram } from "../../hooks/useTelegram";
import { useUserStore } from "../../store/userStore";

export default function Splash() {
  const { user: tgUser } = useTelegram();
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    // ---------------------------------------------------
    // 🔥 FULLSCREEN / iOS FIX
    // ---------------------------------------------------
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

    // ---------------------------------------------------
    // 🔥 Основная логика загрузки
    // ---------------------------------------------------
    async function loadUser() {
      if (!tgUser) return;

      console.log("TG USER:", tgUser);

      // ===== 1. находим или создаём =====
      const user = await findOrCreateUser(tgUser);

      if (!user) {
        console.error("USER NOT FOUND");
        return;
      }

      setUser(user);

      // ===== 2. задержка для сплеша =====
      await new Promise((res) => setTimeout(res, 3200));

      // ===== 3. логика маршрутизации =====
      if (user.has_onboarded) {
        window.location.href = "/home"; // уже проходил
      } else {
        window.location.href = "/intro"; // первый вход
      }
    }

    loadUser();
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
      </div>
    </section>
  );
}
