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
        /* === БАЗА === */
        .screen {
          width: 100%;
          height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;
          align-items: center;

          padding: calc(env(safe-area-inset-top) + 40px) 20px 40px;
          box-sizing: border-box;

          max-width: 520px;
          margin: 0 auto;
        }

        /* === ВЕРХНИЙ БЛОК === */
        .top {
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 40px;      /* 🔥 расстояние между текстами 40px */
          margin-bottom: 40px; /* 🔥 отступ вниз */
        }

        .dots-top {
          opacity: 0.45;
          font-size: 14px;
          letter-spacing: 3px;
        }

        .title {
          font-size: 23px;
          font-weight: 600;
          margin: 0;
          line-height: 1.25;
        }

        .subtitle {
          font-size: 14px;
          color: #5c5c5c;
          margin: 0;
          line-height: 1.4;
        }

        /* === КАРТИНКА === */
        .center {
          flex-grow: 1; /* центрирует ровно между верхом и низом */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .intro-img {
          width: 82%;
          max-width: 440px;
        }

        /* === НИЗ === */
        .bottom {
          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 40px;        /* 🔥 расстояние между кнопкой и точками 40px */
          margin-top: 40px; /* 🔥 отступ вверх */
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

        /* === ПЛАНШЕТЫ (убираем картинку) === */
        @media (min-width: 768px) {
          .screen {
            max-width: 600px;
            padding-top: 60px;
          }

          .center {
            display: none;  /* 🔥 скрываем картинку */
          }

          .title {
            font-size: 30px;
          }
          .subtitle {
            font-size: 17px;
          }

          .next-btn {
            width: 300px;
            height: 60px;
            font-size: 20px;
          }
        }

        /* === ПК === */
        @media (min-width: 1024px) {
          .screen {
            max-width: 700px;
            padding-top: 80px;
          }

          .title {
            font-size: 34px;
          }
          .subtitle {
            font-size: 18px;
          }

          .next-btn {
            width: 330px;
            height: 62px;
          }
        }
      `}</style>

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

        {/* КАРТИНКА (только мобильные) */}
        <div className="center">
          <img className="intro-img" src={IntroImage} alt="intro" />
        </div>

        {/* НИЗ */}
        <div className="bottom">
          <button className="next-btn">Далее</button>
          <div className="dots-bottom">● ○ ○ ○</div>
        </div>

      </div>
    </>
  );
}
