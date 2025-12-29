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
    align-items: center;

    padding: calc(env(safe-area-inset-top) + 50px) 20px 40px;
    box-sizing: border-box;

    max-width: 520px;
    margin: 0 auto;
  }

  /* === ВЕРХ Мобильные === */
  .top {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 12px;
    margin-top: 30px;
  }

  .dots-top {
    opacity: 0.45;
    font-size: 14px;
    letter-spacing: 3px;
  }

  .title {
    font-size: 27px;
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

  /* === КАРТИНКА — только мобильные === */
  .center {
    flex-grow: 1;
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
  }

  .dots-bottom {
    font-size: 12px;
    color: #222;
  }


  /* === ПЛАНШЕТЫ (768px+) === */
  @media (min-width: 768px) {
    .screen {
      max-width: 640px;
      padding-top: 70px;
      padding-bottom: 70px;
    }

    /* Убираем картинку */
    .center {
      display: none;
    }

    /* Тексты — одинаковые расстояния */
    .top {
      width: 100%;
      gap: 24px;         /* одинаковые отступы между строками */
      margin-top: 0;
    }

    .title {
      font-size: 32px;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 18px;
      line-height: 1.45;
    }

    /* Кнопка ниже — отступ в 2 раза больше */
    .bottom {
      gap: 48px;         /* 🔥 2× больше чем 24px */
      margin-top: 60px;
      margin-bottom: 0;
    }

    .next-btn {
      width: 320px;
      height: 60px;
      font-size: 20px;
    }
  }


  /* === ПК (1024px+) === */
  @media (min-width: 1024px) {
    .screen {
      max-width: 700px;
      padding-top: 90px;
      padding-bottom: 90px;
      border-radius: 24px;
    }

    .top {
      gap: 24px;
    }

    .title {
      font-size: 36px;
    }

    .subtitle {
      font-size: 20px;
    }

    /* Кнопка + точки — 48px между ними */
    .bottom {
      gap: 48px;
      margin-top: 70px;
    }

    .next-btn {
      width: 360px;
      height: 62px;
      font-size: 21px;
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

        {/* КАРТИНКА Mobile Only */}
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
