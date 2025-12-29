import { useEffect, useState } from "react";
import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useUserStore } from "../../store/userStore";

// 👉 Картинка расположена в src/assets/
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
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        background: "#ffffff",
      }}
    >
      <div className="splash-inner">

        {/* Верхние точки */}
        <div
          style={{
            opacity: 0.45,
            fontSize: 14,
            marginBottom: 10,
            letterSpacing: "3px",
          }}
        >
          ... ★ • • •
        </div>

        {/* Заголовок */}
        <h1
          style={{
            fontSize: 26,
            fontWeight: 600,
            lineHeight: "1.2",
            color: "#111",
            margin: 0,
            textAlign: "center",
          }}
        >
          Начать с начала — это<br />
          пространство мягких<br />
          перезапусков
        </h1>

        {/* Подзаголовок */}
        <p
          style={{
            fontSize: 16,
            color: "#5c5c5c",
            lineHeight: "1.35",
            textAlign: "center",
            marginTop: 10,
            maxWidth: 330,
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
            width: "82%",
            maxWidth: 300,
            height: "auto",
            marginTop: 30,
            marginBottom: 10,
            borderRadius: 0,
            objectFit: "contain",
          }}
        />

        {/* Кнопка */}
        <button
          style={{
            width: 240,
            height: 56,
            border: "none",
            borderRadius: 16,
            background: "#2c2c2e",
            color: "#fff",
            fontSize: 18,
            fontWeight: 500,
            cursor: "pointer",
            marginTop: 20,
          }}
          onClick={() => console.log("Next screen")}
        >
          Далее
        </button>

        {/* Нижние точки */}
        <div style={{ marginTop: 12, fontSize: 12, color: "#222" }}>
          ● ○ ○ ○
        </div>
      </div>
    </div>
  );
}
