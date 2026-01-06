import { useNavigate } from "react-router-dom";

export default function FirstStep() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        body {
          margin: 0;
        }

        .screen {
          width: 100%;
          min-height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          padding: calc(env(safe-area-inset-top) + 20px) 20px 40px;
          max-width: 520px;
          margin: 0 auto;
        }

        /* HEADER */
        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .back {
          border: none;
          background: none;
          font-size: 20px;
          cursor: pointer;
          color: #666;
        }

        .header-title {
          flex: 1;
          text-align: center;
          font-size: 16px;
          font-weight: 500;
          color: #444;
          margin-right: 30px; /* визуальный центр */
        }

        /* CONTENT */
        h1 {
          font-size: 28px;
          margin: 0 0 6px;
          font-weight: 600;
          color: #222;
        }

        .subtitle {
          font-size: 15px;
          color: #777;
          margin-bottom: 18px;
        }

        .text {
          font-size: 15px;
          line-height: 1.55;
          color: #555;
          margin-bottom: 14px;
        }

        /* CTA */
        .start-btn {
          width: 100%;
          height: 52px;
          border-radius: 18px;
          border: none;
          background: #e8e4dd;
          color: #555;
          font-size: 16px;
          font-weight: 500;
          margin: 22px 0 30px;
        }

        /* LIST */
        .section-title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 12px;
          color: #333;
        }

        .list {
          background: #ffffff;
          border-radius: 22px;
          padding: 8px 14px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.06);
        }

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-top: 1px solid #eee;
        }

        .item:first-child {
          border-top: none;
        }

        .item-text {
          font-size: 15px;
          color: #444;
        }

        .arrow {
          font-size: 18px;
          color: #bbb;
        }

        .item-sub {
          font-size: 13px;
          color: #777;
          margin-top: 2px;
        }
      `}</style>

      <div className="screen">
        {/* HEADER */}
        <div className="header">
          <button className="back" onClick={() => navigate(-1)}>←</button>
          <div className="header-title">Маленькие шаги</div>
        </div>

        {/* INTRO */}
        <h1>Маленькие шаги</h1>
        <div className="subtitle">Как начинать и прогреваться</div>

        <div className="text">
          Начинать важно с заботой о себе. В каждом дне достаточно места
          для маленького шага.
        </div>

        <div className="text">
          Курс разбит на этапы. На каждом этапе ты узнаешь, как можно
          начинать и «прогреваться», важные идеи о темпе, ошибках и
          практических мелочах, полезных на старте.
        </div>

        <button className="start-btn">
          Начать курс
        </button>

        {/* CONTENT LIST */}
        <div className="section-title">Оглавление</div>

        <div className="list">
          <div className="item">
            <div className="item-text">
              Почему большие цели останавливают движение
            </div>
            <div className="arrow">›</div>
          </div>

          <div className="item">
            <div className="item-text">
              Зачем мозг сопротивляется началу
            </div>
            <div className="arrow">›</div>
          </div>

          <div className="item">
            <div className="item-text">
              Ошибка ожидания результата
            </div>
            <div className="arrow">›</div>
          </div>

          <div className="item">
            <div className="item-text">
              Что такое правильный маленький шаг
            </div>
            <div className="arrow">›</div>
          </div>

          <div className="item">
            <div>
              <div className="item-text">
                Анализ сделанного шага
              </div>
              <div className="item-sub">
                что произошло на самом деле
              </div>
            </div>
            <div className="arrow">›</div>
          </div>

          <div className="item">
            <div>
              <div className="item-text">
                Извлечение опыта
              </div>
              <div className="item-sub">
                что этот шаг показал о тебе
              </div>
            </div>
            <div className="arrow">›</div>
          </div>

          <div className="item">
            <div className="item-text">
              Итог: движение как честный диалог с собой
            </div>
            <div className="arrow">›</div>
          </div>
        </div>
      </div>
    </>
  );
}
