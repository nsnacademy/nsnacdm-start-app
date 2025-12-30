import { useEffect, useState } from "react";

export default function Home() {
  const [firstVisit, setFirstVisit] = useState(null);

  useEffect(() => {
    const wasHere = localStorage.getItem("visited");

    if (!wasHere) {
      setFirstVisit(true);
      localStorage.setItem("visited", "true");
    } else {
      setFirstVisit(false);
    }
  }, []);

  return (
    <>
      <style>{`
        .home {
          width: 100%;
          height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;

          padding: 20px;
        }

        .box {
          max-width: 360px;
          text-align: center;
        }

        .title {
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .text {
          font-size: 16px;
          color: #555;
          line-height: 1.55;
        }

        .status {
          margin-top: 20px;
          font-size: 17px;
          font-weight: 600;
        }
      `}</style>

      <div className="home">
        <div className="box">
          <div className="title">Главный экран</div>

          <div className="text">
            Здесь в будущем будет твой функционал: шаги, очки действия,
            инструменты, трекеры.
          </div>

          {firstVisit !== null && (
            <div className="status">
              {firstVisit
                ? "✨ Ты здесь впервые"
                : "👋 Ты уже заходил ранее"}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
