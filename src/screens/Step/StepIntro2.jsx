import { useNavigate } from "react-router-dom";
import StepImage from "../../assets/step2.png";

export default function StepIntro2() {
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

        .text-block {
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 14px;
          margin-top: 50px;
        }

        .text-block p {
          font-size: 16px;
          color: #1a1a1a;
          line-height: 1.48;
          margin: 0;
        }

        .text-block strong {
          font-weight: 600;
        }

        .center {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .step-img {
          width: 100%;
          max-width: 740px;
        }

        /* === НИЖНИЙ БЛОК — ВЫРОВНЕН === */
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

        /* === Планшеты === */
        @media (min-width: 768px) {
          .screen {
            max-width: 640px;
            padding: 0 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .center {
            display: none;
          }

          .text-block p {
            font-size: 20px;
          }

          .bottom {
            gap: 28px;
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
            justify-content: center;
            align-items: center;
          }

          .text-block p {
            font-size: 22px;
          }

          .bottom {
            gap: 28px;
            margin-top: 40px;
            margin-bottom: 0;
          }

          .next-btn {
            width: 340px;
            height: 62px;
            font-size: 21px;
          }
        }
      `}</style>

      <div className="screen">
        <div className="text-block">
          <p><strong>ОД — очки действия</strong> за твои шаги.</p>
          <p>
            Чем больше ОД, тем <strong>выше уровень</strong>ㅤ
            и тем <strong>больше доступных функций</strong>.
          </p>
        </div>

        <div className="center">
          <img className="step-img" src={StepImage} alt="step intro 2" />
        </div>

        <div className="bottom">
          <button
            className="next-btn"
            onClick={() => navigate("/step-intro-3")}
          >
            Далее
          </button>
          <div className="dots-bottom">● ● ● ○</div>
        </div>
      </div>
    </>
  );
}
