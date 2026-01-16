import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HelpRequest() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("choice"); // choice | questions | next
  const [selected, setSelected] = useState(null);

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

        /* ===== ЭКРАН ===== */
        .screen {
          width: 100%;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          /* ⬇️ общий отступ сверху */
          padding:
            calc(env(safe-area-inset-top) + 40px)
            20px
            60px;

          max-width: 520px;
          margin: 0 auto;
        }

        /* ===== КНОПКА НАЗАД ===== */
        .back {
          font-size: 20px;
          color: #999;
          cursor: pointer;
          margin-bottom: 20px; /* ⬅️ РОВНО 20px до заголовка */
          user-select: none;
        }

        .title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 14px;
        }

        .text {
          font-size: 15px;
          line-height: 1.65;
          color: #444;
          white-space: pre-line;
          margin-bottom: 26px;
        }

        .note {
          margin: 30px 0 18px;
          font-size: 13px;
          color: #999;
          text-align: center;
          line-height: 1.45;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .btn {
          width: 100%;
          height: 46px;
          border-radius: 16px;
          border: none;
          background: #f0f0f0;
          font-size: 15px;
          cursor: pointer;
        }

        .primary {
          background: #222;
          color: #fff;
        }

        .choice {
          background: #f0f0f0;
          padding: 14px;
          border-radius: 16px;
          margin-bottom: 10px;
          cursor: pointer;
          font-size: 14px;
          line-height: 1.4;
        }

        .choice.active {
          background: #e0e0e0;
        }

        .question {
          margin: 12px 0 18px;
          font-size: 14px;
          line-height: 1.55;
          color: #444;
        }
      `}</style>

      <div className="screen">
        {/* ← НАЗАД */}
        <div className="back" onClick={() => navigate(-1)}>
          ←
        </div>

        {/* ЗАГОЛОВОК */}
        <div className="title">Точка застревания</div>

        <div className="text">
{`Если ты читаешь это —
значит внутри уже не просто тяжело.

Это то состояние, где ты вроде бы функционируешь,
что-то делаешь,
куда-то идёшь,
но внутри постоянно крутится одна мысль:

«Я застрял».

Не драматично.
Без истерики.
Просто глухо.

Ты прокручиваешь ситуацию снова и снова.
Иногда злишься на себя.
Иногда убеждаешь себя, что «ничего страшного».
Иногда сравниваешь с другими и чувствуешь неприятное сжатие внутри.

И самое мерзкое —
ты не до конца понимаешь, что именно пошло не так.

Обычно в этот момент человек делает одно из двух.

Либо начинает давить на себя.
Либо делает вид, что ему всё равно.

Если быть честным —
оба варианта тебе знакомы.
И ни один не работает.`}
        </div>

        {/* ===== ВЫБОР ===== */}
        {phase === "choice" && (
          <>
            <div className="note">
              Дальше можно пойти по-разному.  
              Ты можешь углубиться —  
              или просто продолжить чтение.
            </div>

            <div className="actions">
              <button
                className="btn"
                onClick={() => setPhase("questions")}
              >
                Погрузиться глубже
              </button>

              <button
                className="btn"
                onClick={() => setPhase("next")}
              >
                Читать дальше
              </button>
            </div>
          </>
        )}

        {/* ===== ВОПРОСЫ ===== */}
        {phase === "questions" && (
          <>
            <div className="note">
              Можно ответить мысленно  
              или записать ответы на бумаге.
            </div>

            {[
              {
                key: "lost",
                label: "Я не понимаю, где всё пошло не так",
                question:
                  "Где был момент, после которого ситуация перестала быть управляемой?",
              },
              {
                key: "anger",
                label: "Я злюсь на себя",
                question:
                  "За что именно ты себя винишь — и действительно ли это полностью твоя ответственность?",
              },
              {
                key: "deadend",
                label: "Я чувствую тупик",
                question:
                  "Что ты продолжаешь пытаться изменить, хотя это уже не в твоей зоне контроля?",
              },
            ].map((item) => (
              <div key={item.key}>
                <div
                  className={`choice ${selected === item.key ? "active" : ""}`}
                  onClick={() => setSelected(item.key)}
                >
                  {item.label}
                </div>

                {selected === item.key && (
                  <div className="question">
                    {item.question}
                  </div>
                )}
              </div>
            ))}

            <button
              className="btn primary"
              onClick={() => setPhase("next")}
            >
              Я готов идти дальше
            </button>
          </>
        )}

        {/* ===== СЛЕДУЮЩИЙ ТЕКСТ ===== */}
        {phase === "next" && (
          <>
            <div className="text">
{`Если ты дошёл до этого места —
значит ты уже не убегаешь.

Ты смотришь на ситуацию честнее,
чем раньше.

Дальше будет не про мотивацию.
И не про советы.

А про ясность
и следующий реальный шаг.`}
            </div>

            <button
              className="btn primary"
              onClick={() => navigate(-1)}
            >
              Вернуться
            </button>
          </>
        )}
      </div>
    </>
  );
}
