import { useEffect } from "react";
import "./Splash.css";
import { supabase } from "../../lib/supabase";
import { useTelegram } from "../../hooks/useTelegram";

export default function Splash() {
  const { user: tgUser } = useTelegram();

  useEffect(() => {
    async function saveTelegramUser() {
      if (!tgUser) {
        console.log("TG user not found yet");
        return;
      }

      console.log("Saving user to Supabase:", tgUser);

      // Записываем или обновляем пользователя в базе
      await supabase.from("users").upsert({
        id: tgUser.id,
        first_name: tgUser.first_name,
        username: tgUser.username ?? null,
      });

      // Переход после записи
      window.location.href = "/intro";
    }

    // Запускаем функцию через 4.2 секунды (анимация)
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
