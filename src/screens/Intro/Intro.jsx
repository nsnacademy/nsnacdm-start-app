import { useEffect, useState } from "react";
import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useUserStore } from "../../store/userStore";

// 👉 Картинка (положи в src/assets/)
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
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        background: "#fF8F8F8",
      }}
    >
      <div
        className="splash-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "26px", // общий base-gap (iOS style)
          maxWidth: "380px", // шире!
          width: "100%",
        }}
      >
        {/* Верхние точки */}
        <div
          style={{
            opacity: 0.45,
            fontSize: 14,
            letterSpacing: "3px",
            marginBottom: "10px",
          }}
        >
          ... ★ • • •
        </div>

        {/* Заголовок */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            lineHeight: "1.25",
            color: "#111",
            margin: 0,
            maxWidth: "340px",
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
            lineHeight: "1.45",
            marginTop: "6px",
            maxWidth: "350px",
          }}
        >
          Ты возвращаешь себе контроль<br />
          маленькими шагами.
        </p>

        {/* Иллюстрация */}
        <img
          src={IntroImage}
          alt="intro illustration"
          style={{
            width: "88%",            // шире, но адаптивно
            maxWidth: "320px",
            height: "auto",
            marginTop: "10px",
            marginBottom: "10px",
            objectFit: "contain",
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
            marginTop: "10px",
          }}
          onClick={() => console.log("Next screen")}
        >
          Далее
        </button>

        {/* Нижние точки */}
        <div style={{ marginTop: 10, fontSize: 12, color: "#222" }}>
          ● ○ ○ ○
        </div>
      </div>
    </div>
  );
}
