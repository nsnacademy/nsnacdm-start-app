import { useEffect, useState } from "react";
import { findOrCreateUser } from "../../lib/findOrCreateUser";

export default function Intro() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading"); 
  // loading | new | existing

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const tgUser = tg?.initDataUnsafe?.user;

    async function load() {
      const result = await findOrCreateUser(tgUser);

      if (!result) {
        setStatus("error");
        return;
      }

      // Определяем новый ли это был юзер
      if (result.created_at === result.updated_at) {
        setStatus("new");
      } else {
        setStatus("existing");
      }

      setUser(result);
    }

    load();
  }, []);

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
            <p style={{ color: "green" }}>
              ✔ Этот пользователь был создал только что!
            </p>
          )}

          {status === "existing" && (
            <p style={{ color: "blue" }}>
              ✔ Найден существующий пользователь в базе Supabase
            </p>
          )}
        </div>
      )}
    </div>
  );
}
