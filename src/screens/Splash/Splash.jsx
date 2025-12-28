import { useEffect } from "react";
import "./Splash.css";
import { supabase } from "../../lib/supabase";
import { useTelegram } from "../../hooks/useTelegram";

export default function Splash() {
  const { user: tgUser } = useTelegram();

  useEffect(() => {
    // -------------------------------
    // 📌 1. Разворачиваем WebApp во весь экран
    // -------------------------------
    try {
      window.Telegram?.WebApp?.expand();
      window.Telegram?.WebApp?.disableVerticalSwipes();
      console.log("WebApp expanded");
    } catch (e) {
      console.warn("Expand error:", e);
    }

    // -------------------------------
    // 📌 2. Функция сохранения пользователя
    // -------------------------------
    async function saveTelegramUser() {
      if (!tgUser) {
        console.log("TG user not found yet");
        return;
      }

      console.log("Saving user to Supabase:", tgUser);

      await supabase.from("users").upsert({
        telegram_id: String(tgUser.id),
        username: tgUser.username ?? null,
        first_name: tgUser.first_name ?? null,
        created_at: new Date().toISOString(),
        level: 1,
        xp: 0,
      });

      console.log("User saved!");
      window.location.href = "/intro";
    }

    // -------------------------------
    // 📌 3. Запускаем через 4.2 сек (анимация)
    // -------------------------------
    const timer = setTimeout(saveTelegramUser, 4200);

    return () => clearTimeout(timer);
  }, [tgUser]);

  // -------------------------------
  // 📌 4. UI
  // -------------------------------
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
