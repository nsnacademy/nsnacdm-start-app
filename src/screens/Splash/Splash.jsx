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
        tg?.requestFullscreen?.();
        tg?.expand();
        tg?.disableVerticalSwipes?.();
      } catch (e) {
        console.log("iOS fullscreen error:", e);
      }
    }

    iosExpandHack();
    const t1 = setTimeout(iosExpandHack, 300);
    const t2 = setTimeout(iosExpandHack, 1200);

    async function load() {
      if (!tgUser) return;

      // 🔥 Предзагрузка изображений
      try {
        await preloadImages();
      } catch (e) {
        console.log("Image preload error:", e);
      }

      // 👤 Получаем или создаём пользователя
      const user = await findOrCreateUser(tgUser);
      if (!user) return;

      // 🧠 сохраняем пользователя
      setUser(user);

      // ⏳ даём Splash доиграть анимацию
      await new Promise((res) => setTimeout(res, 3200));

      // 🚀 ЕДИНСТВЕННЫЙ ПУТЬ — НА HOME
      navigate("/home", { replace: true });
    }

    load();

    // 🧼 cleanup
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      try {
        tg?.expand?.();
      } catch {}
    };
  }, [tgUser, setUser, navigate]);

  return (
    <section className="screen splash">
      <div className="splash-inner">
        <div className="splash-title">НАЧАТЬ С НАЧАЛА</div>

        <div className="splash-sub">
          Пространство маленьких шагов.
        </div>

        <div className="splash-line-wrap">
          <div className="splash-line"></div>
        </div>
      </div>
    </section>
  );
}
