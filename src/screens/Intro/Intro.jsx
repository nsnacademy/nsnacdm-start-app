import { useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { saveUser } from "../../lib/saveUser";

export default function Intro() {
  const { user } = useTelegram();

  useEffect(() => {
    if (user) {
      console.log("Saving user to Supabase:", user);
      saveUser(user);
    }
  }, [user]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Intro</h1>

      <p><b>Telegram User Test:</b></p>

      {user ? (
        <>
          <p>ID: {user.id}</p>
          <p>Имя: {user.first_name}</p>
          <p>Username: {user.username || "нет username"}</p>
        </>
      ) : (
        <p>Нет данных о пользователе</p>
      )}
    </div>
  );
}
