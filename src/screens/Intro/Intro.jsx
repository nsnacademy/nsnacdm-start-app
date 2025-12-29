import { useEffect, useState } from "react";
import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useUserStore } from "../../store/userStore";

// картинка
import IntroImage from "../../assets/intro.png";

export default function Intro() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const tgUser = tg?.initDataUnsafe?.user;

    async function load() {
      if (!tgUser) return setStatus("error");

      const result = await findOrCreateUser(tgUser);
      if (!result) return setStatus("error");

      setUser(result);

      if (result.created_at === result.updated_at) setStatus("new");
      else setStatus("existing");
    }

    load();
  }, [setUser]);

  return (
    <div
      className="screen splash"
      style={{
        width: "100%",
        height: "100vh",
        padding: "40px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F8F8F8", // твой цвет
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        className="splash-inner"
        style={{
          gap: "32px", // 🔥 увеличил расстояние красиво
          maxWidth: "380px",
        }}
      >
        {/* Точки */}
        <div
          style={{
            opacity: 0.45,
            fontSize: 14,
            letterSpacing: "3px",
            marginBottom: "4px", // чуть меньше, чтобы всё ровно
          }}
        >
          ... ★ • • •
        </div>

        {/* Заголовок */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            lineHeight: "1.3",
            color: "#111",
            margin: 0,
            maxWidth: "350px",
          }}
        >
          Начать с начала — это<br />
          пространство мягких<br />
          перезапусков
        </h1>

        {/* Подзаголовок */}
        <p
          style={{
            fontSize: 17,
            color: "#5c5c5c",
            lineHeight: "1.5",
            maxWidth: "350px",
            marginTop: "-10px", // 🔥 подправил, чтобы расстояния были идеальными
          }}
        >
          Ты возвращаешь себе контроль<br />
          маленькими шагами.
        </p>

        {/* Картинка */}
        <img
          src={IntroImage}
          alt="intro illustration"
          style={{
            width: "88%",
            maxWidth: "320px",
            height: "auto",
            objectFit: "contain",
            background: "#F8F8F8",
          }}
        />

        {/* Кнопка */}
        <button
          style={{
            width: 260,
            height: 56,
            border: "none",
            borderRadius: 16,
            background: "#2c2c2e",
            color: "#fff",
            fontSize: 18,
            fontWeight: 500,
            cursor: "pointer",
          }}
          onClick={() => console.log("NEXT SCREEN")}
        >
          Далее
        </button>

        {/* Точки снизу */}
        <div style={{ fontSize: 12, color: "#222" }}>● ○ ○ ○</div>
      </div>
    </div>
  );
}
