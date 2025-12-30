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

    function iosExpandHack() {
      try {
        tg?.requestFullscreen?.();
        tg?.expand();
        tg?.disableVerticalSwipes?.();
      } catch (e) {}
    }

    iosExpandHack();
    setTimeout(iosExpandHack, 300);
    setTimeout(iosExpandHack, 1200);

    // 🔥 Основная логика
    async function loadUser() {
      if (!tgUser) return;

      console.log("TG USER:", tgUser);

      // 1) Находим или создаём пользователя
      const user = await findOrCreateUser(tgUser);

      if (!user) {
        console.error("USER NOT FOUND");
        return;
      }

      setUser(user);

      // 2) ждем завершения сплеша
      await new Promise((res) => setTimeout(res, 3200));

      // 3) логика показа онбординга
      if (user.has_onboarded) {
        window.location.href = "/home";
      } else {
        window.location.href = "/intro";
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
