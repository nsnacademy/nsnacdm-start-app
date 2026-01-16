import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HelpRequest() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("choice"); 
  // choice | questions | next
  const [selected, setSelected] = useState(null);

  const [showSecondQuestions, setShowSecondQuestions] = useState(false);
  const [selectedSecond, setSelectedSecond] = useState(null);

  const [showThird, setShowThird] = useState(false);
  const [showThirdQuestions, setShowThirdQuestions] = useState(false);
  const [selectedThird, setSelectedThird] = useState(null);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; }

        /* ===== FIXED BACK ===== */
        .back {
          position: fixed;
          top: calc(env(safe-area-inset-top) + 20px);
          left: 20px;
          font-size: 20px;
          color: #999;
          cursor: pointer;
          user-select: none;
          z-index: 20;
        }

        .screen {
          width: 100%;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          /* ⬇️ запас под фиксированную стрелку */
          padding:
            calc(env(safe-area-inset-top) + 90px)
            20px
            80px;

          max-width: 520px;
          margin: 0 auto;
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
          margin-bottom: 30px;
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

        .spacer {
          height: 60px;
        }
      `}</style>

      {/* ← FIXED BACK */}
      <div className="back" onClick={() => navigate(-1)}>←</div>

      <div className="screen">

        {/* ===== ТЕМА 1 ===== */}
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

        {phase === "choice" && (
          <>
            <div className="note">
              Дальше можно пойти по-разному.
            </div>

            <div className="actions">
              <button className="btn" onClick={() => setPhase("questions")}>
                Погрузиться глубже
              </button>
              <button className="btn primary" onClick={() => setPhase("next")}>
                Читать дальше
              </button>
            </div>
          </>
        )}

        {phase === "questions" && (
          <>
            <div className="note">
              Можно ответить мысленно или записать.
            </div>

            {[
              {
                key: "lost",
                label: "Я не понимаю, где всё пошло не так",
                question: "Где был момент, после которого ситуация перестала быть управляемой?",
              },
              {
                key: "anger",
                label: "Я злюсь на себя",
                question: "За что именно ты себя винишь?",
              },
              {
                key: "deadend",
                label: "Я чувствую тупик",
                question: "Что ты пытаешься изменить, хотя это уже не в твоей зоне контроля?",
              },
            ].map(item => (
              <div key={item.key}>
                <div
                  className={`choice ${selected === item.key ? "active" : ""}`}
                  onClick={() => setSelected(item.key)}
                >
                  {item.label}
                </div>
                {selected === item.key && (
                  <div className="question">{item.question}</div>
                )}
              </div>
            ))}

            <button className="btn primary" onClick={() => setPhase("next")}>
              Я готов идти дальше
            </button>
          </>
        )}

        {/* ===== ТЕМА 2 ===== */}
        {phase === "next" && (
          <>
            <div className="spacer" />

            <div className="title">Где заканчивается твой контроль</div>

            <div className="text">
{`Ты продолжаешь пытаться контролировать то,
что уже не зависит от тебя.

Чем дольше ты борешься —
тем сильнее ощущение бессилия.

Контроль — это видеть,
на что ты влияешь,
а на что — нет.`}
            </div>

            {!showSecondQuestions && (
              <div className="actions">
                <button
                  className="btn"
                  onClick={() => setShowSecondQuestions(true)}
                >
                  Погрузиться глубже
                </button>
                <button
                  className="btn primary"
                  onClick={() => setShowThird(true)}
                >
                  Читать дальше
                </button>
              </div>
            )}

            {showSecondQuestions && (
              <>
                {[
                  {
                    key: "outside",
                    label: "Я держусь за то, что не могу контролировать",
                    question: "Что именно ты продолжаешь удерживать?",
                  },
                  {
                    key: "inside",
                    label: "Я игнорирую то, что могу изменить",
                    question: "Что реально в твоей власти сейчас?",
                  },
                ].map(item => (
                  <div key={item.key}>
                    <div
                      className={`choice ${selectedSecond === item.key ? "active" : ""}`}
                      onClick={() => setSelectedSecond(item.key)}
                    >
                      {item.label}
                    </div>
                    {selectedSecond === item.key && (
                      <div className="question">{item.question}</div>
                    )}
                  </div>
                ))}

                <button
                  className="btn primary"
                  onClick={() => setShowThird(true)}
                >
                  Идти дальше
                </button>
              </>
            )}
          </>
        )}

        {/* ===== ТЕМА 3 ===== */}
        {showThird && (
          <>
            <div className="spacer" />

            <div className="title">Какой опыт ты можешь забрать</div>

            <div className="text">
{`Даже сложные состояния
что-то оставляют после себя.

Вопрос не в результате.
А в том, что ты понял о себе.`}
            </div>

            {!showThirdQuestions && (
              <div className="actions">
                <button
                  className="btn"
                  onClick={() => setShowThirdQuestions(true)}
                >
                  Погрузиться глубже
                </button>
                <button
                  className="btn primary"
                  onClick={() => navigate(-1)}
                >
                  Завершить
                </button>
              </div>
            )}

            {showThirdQuestions && (
              <>
                {[
                  {
                    key: "learned",
                    label: "Я понял о себе что-то важное",
                    question: "Что ты теперь знаешь о себе?",
                  },
                  {
                    key: "next",
                    label: "Я вижу следующий шаг",
                    question: "Какой маленький шаг возможен дальше?",
                  },
                ].map(item => (
                  <div key={item.key}>
                    <div
                      className={`choice ${selectedThird === item.key ? "active" : ""}`}
                      onClick={() => setSelectedThird(item.key)}
                    >
                      {item.label}
                    </div>
                    {selectedThird === item.key && (
                      <div className="question">{item.question}</div>
                    )}
                  </div>
                ))}

                <button
                  className="btn primary"
                  onClick={() => navigate(-1)}
                >
                  Завершить
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
