import { useNavigate } from "react-router-dom";

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
          justify-content: center;

          padding: 40px 20px;
          box-sizing: border-box;
          max-width: 520px;
          margin: 0 auto;
        }

        .text-block {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 22px;
          max-width: 600px;
        }

        .text-block p {
          font-size: 20px;
          color: #1a1a1a;
          line-height: 1.45;
          margin: 0;
        }

        .next-btn {
          margin-top: 48px;
          width: 260px;
          height: 56px;
          border: none;
          border-radius: 16px;
          background: #2c2c2e;
          color: #fff;
          font-size: 18px;
        }

        @media (min-width: 768px) {
          .text-block p {
            font-size: 24px;
          }

          .next-btn {
            width: 300px;
            height: 60px;
            font-size: 20px;
          }
        }

        @media (min-width: 1024px) {
          .screen {
            max-width: 700px;
            border-radius: 24px;
          }

          .text-block p {
            font-size: 26px;
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
          <p>Шаг — это маленькое действие на 3–10 минут.</p>
          <p>Ты не бежишь — ты просто двигаешься.</p>
          <p>Каждый шаг — попытка. Каждая попытка — победа.</p>
        </div>

        <button
          className="next-btn"
          onClick={() => navigate("/")}   // ← дальше куда хочешь
        >
          Далее
        </button>
      </div>
    </>
  );
}
