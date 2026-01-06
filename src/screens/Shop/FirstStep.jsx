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
          width: 92%;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          padding: calc(env(safe-area-inset-top) + 60px) 0 60px;
          max-width: 520px;
          margin: 0 auto;

          overflow-y: auto;
        }

        /* HEADER */
        .header {
          display: grid;
          grid-template-columns: 40px 1fr 40px;
          align-items: center;
          margin-bottom: 26px;
        }

        .back {
          border: none;
          background: none;
          font-size: 18px;
          cursor: pointer;
          color: #666;
          justify-self: start;
        }

        .header-title {
          text-align: center;
          font-size: 15px;
          font-weight: 500;
          color: #444;
        }

        .header-spacer {
          width: 40px;
        }

        /* CONTENT */
        .subtitle {
          font-size: 14px;
          color: #777;
          margin-bottom: 14px;
        }

        .text {
          font-size: 14px;
          line-height: 1.5;
          color: #555;
          margin-bottom: 12px;
        }

        /* CTA */
        .start-btn {
          width: 100%;
          height: 46px;
          border-radius: 16px;
          border: none;
          background: #e8e4dd;
          color: #555;
          font-size: 15px;
          font-weight: 500;
          margin: 18px 0 26px;
        }

        /* LIST */
        .section-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 10px;
          color: #333;
        }

        .list {
          background: #ffffff;
          border-radius: 20px;
          padding: 6px 14px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.05);
        }

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-top: 1px solid #eee;
        }

        .item:first-child {
          border-top: none;
        }

        .item-text {
          font-size: 14px;
          color: #444;
        }

        .item-sub {
          font-size: 12px;
          color: #777;
          margin-top: 2px;
        }

        .arrow {
          font-size: 16px;
          color: #bbb;
        }
      `}</style>

      <div className="screen">
        {/* HEADER */}
        <div className="header">
          <button className="back" onClick={() => navigate(-1)}>←</button>
          <div className="header-title">Маленькие шаги</div>
          <div className="header-spacer" />
        </div>

        {/* INTRO TEXT */}
        <div className="subtitle">Как начинать и прогреваться</div>

        <div className="text">
          Начинать важно с заботой о себе. В каждом дне достаточно места
          для маленького шага.
        </div>

        <div className="text">
          Курс разбит на этапы. Здесь не про спешку — а про возвращение в
          движение и контакт с собой.
        </div>

        <button className="start-btn">
          Начать курс
        </button>

        {/* LIST */}
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
              <div className="item-text">Анализ сделанного шага</div>
              <div className="item-sub">что произошло на самом деле</div>
            </div>
            <div className="arrow">›</div>
          </div>

          <div className="item">
            <div>
              <div className="item-text">Извлечение опыта</div>
              <div className="item-sub">что этот шаг показал о тебе</div>
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
