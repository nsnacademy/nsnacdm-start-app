import { useEffect, useState } from "react";
import { findOrCreateUser } from "../../lib/findOrCreateUser";
import { useUserStore } from "../../store/userStore";

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
    <>
      <style>{`
        .screen {
          width: 100%;
          height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;

          padding: calc(env(safe-area-inset-top) + 50px) 20px 25px;
          box-sizing: border-box;
        }

        /* ЕЩЁ НИЖЕ */
        .top {
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 12px;

          flex-grow: 0.1;     /* 🔥 Было 0.2 → теперь ниже */
          
        }

        .dots-top {
          opacity: 0.45;
          font-size: 14px;
          letter-spacing: 3px;
        }

        .title {
          font-size: 28px;
          font-weight: 600;
          margin: 0;
          line-height: 1.25;
        }

        .subtitle {
          font-size: 17px;
          color: #5c5c5c;
          margin: 0;
          line-height: 1.4;
        }

        /* Картинка ниже ещё сильнее */
        .center {
          flex-grow: 10;    /* 🔥 Было 1 → теперь ниже */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .intro-img {
          width: 82%;
          max-width: 340px;
        }

        .bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .next-btn {
          width: 260px;
          height: 56px;
          border: none;
          border-radius: 16px;
          background: #2c2c2e;
          color: #fff;
          font-size: 18px;
        }

        .dots-bottom {
          font-size: 12px;
          color: #222;
        }
      `}</style>

      <div className="screen">

        {/* Верх */}
        <div className="top">
          <div className="dots-top">... ★ • • •</div>

          <h1 className="title">
            Начать с начала — это<br />
            пространство мягких<br />
            перезапусков
          </h1>

          <p className="subtitle">
            Ты возвращаешь себе контроль<br />
            маленькими шагами.
          </p>
        </div>

        {/* Картинка */}
        <div className="center">
          <img className="intro-img" src={IntroImage} alt="intro" />
        </div>

        {/* Низ */}
        <div className="bottom">
          <button className="next-btn">Далее</button>
          <div className="dots-bottom">● ○ ○ ○</div>
        </div>

      </div>
    </>
  );
}
