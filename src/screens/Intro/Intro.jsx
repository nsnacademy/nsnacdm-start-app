import { useEffect, useState } from "react";
import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useUserStore } from "../../store/userStore";

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

      // сохраняем пользователя в глобальное хранилище Zustand
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
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: 20 }}>Intro</h1>

      {status === "loading" && <p>Загрузка...</p>}
      {status === "error" && <p>Ошибка загрузки данных</p>}

      {user && (
        <div>
          <p><b>Профиль пользователя:</b></p>
          <p>🆔 Telegram ID: {user.telegram_id}</p>
          <p>👤 Имя: {user.first_name}</p>
          <p>📛 Username: {user.username || "нет"}</p>
          <p>🏅 Уровень: {user.level}</p>
          <p>✨ XP: {user.xp}</p>
          <p>🕒 Создан: {new Date(user.created_at).toLocaleString()}</p>

          <br />

          {status === "new" && (
            <p style={{ color: "green", fontWeight: 600 }}>
              ✔ Этот пользователь был создан только что!
            </p>
          )}

          {status === "existing" && (
            <p style={{ color: "blue", fontWeight: 600 }}>
              ✔ Найден существующий пользователь в базе Supabase
            </p>
          )}
        </div>
      )}
    </div>
  );
}
