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

    // ===========================
    // 🔥 iOS FULLSCREEN FIX
    // ===========================
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

    // ===========================
    // 🔥 ЛОГИКА Splash экрана
    // ===========================
    async function load() {
      if (!tgUser) {
        console.log("Waiting TG user…");
        return;
      }

      console.log("TG USER:", tgUser);

      // 1) Найти или создать пользователя
      const user = await findOrCreateUser(tgUser);

      if (!user) {
        console.error("User not found or error");
        return;
      }

      console.log("USER FROM DB:", user);

      setUser(user);

      // 2) Ждём окончание анимации (как раньше)
      await new Promise((res) => setTimeout(res, 3200));

      // 3) Переход
      if (user.has_onboarded === true) {
        window.location.href = "/home";  // уже видел обучение
      } else {
        window.location.href = "/intro"; // впервые
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
      </div>
    </section>
  );
}
