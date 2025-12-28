import { useEffect } from "react";
import "./Splash.css";
import { supabase } from "../../lib/supabase";
import { useTelegram } from "../../hooks/useTelegram";

export default function Splash() {
  const { user: tgUser } = useTelegram();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    // ---------------------------------------------------
    // 🔥 iOS FULLSCREEN HACK
    // ---------------------------------------------------
    function iosExpandHack() {
      try {
        tg?.requestFullscreen?.();   // частично работает на iOS
        tg?.expand();                // стандартный expand()
        tg?.disableVerticalSwipes(); // не даёт свернуть вниз
      } catch (e) {
        console.log("iOS fullscreen hack error:", e);
      }
    }

    // Запуск нескольких попыток — это важно для iOS
    iosExpandHack();
    setTimeout(iosExpandHack, 300);
    setTimeout(iosExpandHack, 1200);

    // ---------------------------------------------------
    // 🔥 Сохранение пользователя в Supabase
    // ---------------------------------------------------
    async function saveTelegramUser() {
      if (!tgUser) {
        console.log("TG user not found yet");
        return;
      }

      console.log("Saving user to Supabase:", tgUser);

      await supabase.from("users").upsert({
        telegram_id: String(tgUser.id),
        first_name: tgUser.first_name ?? null,
        username: tgUser.username ?? null,
        created_at: new Date().toISOString(),
        level: 1,
        xp: 0,
      });

      window.location.href = "/intro";
    }

    // Задержка для анимации splash
    const timer = setTimeout(saveTelegramUser, 4200);

    return () => clearTimeout(timer);
  }, [tgUser]);

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
