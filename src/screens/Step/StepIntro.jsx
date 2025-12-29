import { useNavigate } from "react-router-dom";
import StepImage from "../../assets/step.png";   // 🔥 картинка

export default function StepIntro() {
  const navigate = useNavigate();

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

        /* === ВЕРХНИЙ ТЕКСТ === */
        .text-block {
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: center;
          margin-top: 20px;
        }

        .text-block p {
          font-size: 16px;
          color: #1a1a1a;
          line-height: 1.45;
          margin: 0;
        }

        /* === КАРТИНКА по центру (как в Intro) === */
        .center {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .step-img {
          width: 100%;
          max-width: 740px;    /* 👈 как в Intro */
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

        /* === Планшеты (убираем картинку, центрируем всё) === */
        @media (min-width: 768px) {
          .screen {
            max-width: 640px;
            padding: 0 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .center {
            display: none; /* 🔥 картинка скрыта */
          }

          .text-block p {
            font-size: 20px;
          }

          .bottom {
            gap: 48px;
            margin-top: 48px;
            margin-bottom: 0;
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
            border-radius: 24px;

            display: flex;
            justify-content: center;
            align-items: center;
          }

          .text-block p {
            font-size: 22px;
          }

          .next-btn {
            width: 340px;
            height: 62px;
            font-size: 21px;
          }
        }
      `}</style>

      <div className="screen">

        {/* ТЕКСТ */}
        <div className="text-block">
          <p>Шаг — это маленькое действие на 3–10 минут.</p>
          <p>Ты не бежишь — ты просто двигаешься.</p>
          <p>Каждый шаг — попытка. Каждая попытка — победа.</p>
        </div>

        {/* КАРТИНКА — как в Intro */}
        <div className="center">
          <img className="step-img" src={StepImage} alt="step intro" />
        </div>

        {/* НИЗ */}
        <div className="bottom">
          <button
            className="next-btn"
            onClick={() => navigate("/")}
          >
            Далее
          </button>
          <div className="dots-bottom">● ● ○ ○</div>
        </div>
      </div>
    </>
  );
}
