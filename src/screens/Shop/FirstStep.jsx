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

          padding: calc(env(safe-area-inset-top) + 110px) 20px 0;
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
          margin: 20px 0 26px;
        }

        /* LIST */
        .section-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 10px;
          color: #333;
        }

        .outline {
          margin-top: 20px;
          border: none;
          outline: none;
          box-shadow: none;
          background: transparent;

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
          Погрузиться в материал 
        </button>


        <div className="outline">
  <div className="section-title">Оглавление</div>

  <div className="list">
    <div className="item">
      <div className="item-text">
        Почему мы не начинаем, даже когда хотим
      </div>
      <div className="arrow">›</div>
    </div>

    <div className="item">
      <div className="item-text">
        Большая цель и почему она мешает шагу
      </div>
      <div className="arrow">›</div>
    </div>

    <div className="item">
      <div className="item-text">
        Что такое маленький шаг на самом деле
      </div>
      <div className="arrow">›</div>
    </div>

    <div className="item">
      <div className="item-text">
        Как выбрать шаг, который не сломается
      </div>
      <div className="arrow">›</div>
    </div>

    <div className="item">
      <div className="item-text">
        Почему один шаг уже считается результатом
      </div>
      <div className="arrow">›</div>
    </div>

    <div className="item">
      <div>
        <div className="item-text">Анализ шага</div>
        <div className="item-sub">что произошло после действия</div>
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
        Как из одного шага появляется следующий
      </div>
      <div className="arrow">›</div>
    </div>
  </div>
</div>

      </div>
    </>
  );
}
