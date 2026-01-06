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

        /* ===== SCREEN (1:1 как Shop) ===== */
        .screen {
          width: 100%;
          min-height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          padding: calc(env(safe-area-inset-top) + 110px) 20px 1px;
          box-sizing: border-box;
          max-width: 520px;
          margin: 0 auto;

          overflow-y: auto;
        }

        /* ===== HEADER ROW ===== */
        .header-row {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-bottom: 14px;
        }

        .back {
          position: absolute;
          left: 0;

          border: none;
          background: none;
          font-size: 22px;
          cursor: pointer;
          color: #666;
        }


        h1 {
          font-size: 22px;
          font-weight: 600;
          margin: 0;
          color: #222;
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
          background: #222;
          color: #f8f8f8;
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
        <div className="header-row">
          <button className="back" onClick={() => navigate(-1)}>←</button>
          <h1>Маленькие шаги</h1>
        </div>


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
