import { useEffect, useState } from "react";
import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useUserStore } from "../../store/userStore";

// 👉 Импорт твоей картинки (положи в src/assets/)
import IntroImage from "../../assets/intro.png";

export default function Intro() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [status, setStatus] = useState("loading");
  // loading | new | existing | error

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const tgUser = tg?.initDataUnsafe?.user;

    async function load() {
      if (!tgUser) {
        setStatus("error");
        return;
      }

      const result = await findOrCreateUser(tgUser);

      if (!result) {
        setStatus("error");
        return;
      }

      // сохраняем пользователя в Zustand
      setUser(result);

      // определяем новый это пользователь или уже существующий
      if (result.created_at === result.updated_at) {
        setStatus("new");
      } else {
        setStatus("existing");
      }
    }

    load();
  }, [setUser]);

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 330,
          minHeight: 700,
          background: "#fff",
          borderRadius: 32,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          textAlign: "center",
          padding: "30px 20px",
        }}
      >
        {/* Верхние точки */}
        <div style={{ opacity: 0.45, fontSize: 14, marginBottom: 20 }}>
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
            marginTop: 14,
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
            width: 220,
            height: 220,
            borderRadius: "50%",
            objectFit: "cover",
            margin: "40px auto",
            display: "block",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
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
            marginTop: 10,
          }}
          onClick={() => {
            // 👉 здесь можешь сделать переход на следующий экран
            console.log("Next screen");
          }}
        >
          Далее
        </button>

        {/* Нижние точки */}
        <div style={{ marginTop: 18, fontSize: 12, color: "#222" }}>
          ● ○ ○ ○
        </div>
      </div>
    </div>
  );
}
