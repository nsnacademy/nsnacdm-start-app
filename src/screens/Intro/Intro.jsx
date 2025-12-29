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
      {/* -------- CSS внутри компонента -------- */}
      <style>{`
        /* -------------------- ЭКРАН -------------------- */
        .screen {
          width: 390px;
          height: 844px;
          margin: 0 auto;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;
          align-items: center;

          padding: 25px 20px;
        }

        /* -------------------- ВЕРХНИЙ БЛОК -------------------- */
        .top {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .dots-top {
          opacity: 0.45;
          font-size: 14px;
          letter-spacing: 3px;
        }

        .title {
          font-size: 26px;
          font-weight: 600;
          line-height: 1.25;
          margin: 0;
        }

        .subtitle {
          font-size: 16px;
          color: #5c5c5c;
          margin: 0;
          line-height: 1.45;
        }

        /* -------------------- ЦЕНТР -------------------- */
        .center {
          margin: 130px 0;
          display: flex;
          justify-content: center;
        }

        .intro-img {
          width: 95%;
          max-width: 300px;
          object-fit: contain;
        }

        /* -------------------- НИЖНИЙ БЛОК -------------------- */
        .bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .next-btn {
          width: 260px;
          height: 56px;
          border: none;
          border-radius: 16px;
          background: #2c2c2e;
          color: #fff;
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
        }

        .dots-bottom {
          font-size: 12px;
          color: #222;
        }
      `}</style>

      {/* ----------- JSX структура ------------- */}
      <div className="screen">
        {/* ВЕРХ */}
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

        {/* КАРТИНКА */}
        <div className="center">
          <img className="intro-img" src={IntroImage} alt="intro" />
        </div>

        {/* НИЗ */}
        <div className="bottom">
          <button className="next-btn" onClick={() => console.log("NEXT SCREEN")}>
            Далее
          </button>

          <div className="dots-bottom">● ○ ○ ○</div>
        </div>
      </div>
    </>
  );
}
