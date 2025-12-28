import { useTelegram } from "../../hooks/useTelegram";

export default function Intro() {
  const { user } = useTelegram();

  return (
    <div style={{ padding: 20 }}>
      <h1>Intro works!</h1>

      <div style={{ marginTop: 20, fontSize: 16 }}>
        <p><b>Telegram User Test:</b></p>

        {user ? (
          <>
            <p>ID: {user.id}</p>
            <p>Имя: {user.first_name}</p>
            <p>Username: {user.username ? user.username : "нет username"}</p>
          </>
        ) : (
          <p>Нет данных о пользователе (вы не в Telegram WebApp)</p>
        )}
      </div>
    </div>
  );
}
