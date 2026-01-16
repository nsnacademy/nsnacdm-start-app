import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HelpRequest() {
  const navigate = useNavigate();

  const [stage, setStage] = useState("topic1"); 
  // topic1 | q1 | topic2 | q2 | end

  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);

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
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          padding:
            calc(env(safe-area-inset-top) + 70px)
            20px
            60px;
          max-width: 520px;
          margin: 0 auto;
        }

        .back {
          font-size: 20px;
          color: #999;
          cursor: pointer;
          margin-bottom: 20px;
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

      <div className="screen">
        <div className="back" onClick={() => navigate(-1)}>←</div>

        {/* ===== ТЕМА 1 ===== */}
        {stage === "topic1" && (
          <>
            <div className="title">Точка застревания</div>

            <div className="text">
{`Если ты читаешь это —
значит внутри уже не просто тяжело.

Это то состояние, где ты вроде бы функционируешь,
что-то делаешь,
куда-то идёшь,
но внутри постоянно крутится одна мысль:

«Я застрял».

Ты стараешься.
Ты не бездействуешь.
Но результат не меняется.

И самое неприятное —
ты не до конца понимаешь, почему.`}
            </div>

            <div className="note">
              Можно пойти глубже  
              или просто продолжить чтение.
            </div>

            <div className="actions">
              <button className="btn" onClick={() => setStage("q1")}>
                Погрузиться глубже
              </button>
              <button className="btn" onClick={() => setStage("topic2")}>
                Читать дальше
              </button>
            </div>
          </>
        )}

        {/* ===== ВОПРОСЫ ТЕМА 1 ===== */}
        {stage === "q1" && (
          <>
            <div className="note">
              Можно отвечать мысленно  
              или записывать на бумаге.
            </div>

            {[
              {
                key: "lost",
                label: "Я не понимаю, где всё пошло не так",
                question:
                  "В какой момент ты почувствовал, что перестал влиять на ситуацию?",
              },
              {
                key: "pressure",
                label: "Я слишком давлю на себя",
                question:
                  "Что ты требуешь от себя сейчас — и откуда взялись эти требования?",
              },
              {
                key: "loop",
                label: "Я хожу по кругу",
                question:
                  "Что именно ты повторяешь снова и снова, надеясь на другой результат?",
              },
            ].map(item => (
              <div key={item.key}>
                <div
                  className={`choice ${selected1 === item.key ? "active" : ""}`}
                  onClick={() => setSelected1(item.key)}
                >
                  {item.label}
                </div>

                {selected1 === item.key && (
                  <div className="question">{item.question}</div>
                )}
              </div>
            ))}

            <button
              className="btn primary"
              onClick={() => setStage("topic2")}
            >
              Идти дальше
            </button>
          </>
        )}

        {/* ===== ТЕМА 2 ===== */}
        {stage === "topic2" && (
          <>
            <div className="spacer" />

            <div className="title">Где заканчивается твой контроль</div>

            <div className="text">
{`Есть одна вещь, которая почти всегда усиливает застревание.

Ты продолжаешь пытаться контролировать то,
что уже не в твоей власти.

Реакции других.
Прошлые решения.
Условия, которые сложились без тебя.

Чем дольше ты с этим борешься —
тем сильнее чувство бессилия.

Контроль — это не заставить мир подстроиться.
Контроль — это ясно видеть,
где заканчивается твоя зона влияния.`}
            </div>

            <div className="note">
              Хочешь посмотреть на это внимательнее  
              или просто читать дальше?
            </div>

            <div className="actions">
              <button className="btn" onClick={() => setStage("q2")}>
                Разобраться
              </button>
              <button className="btn" onClick={() => setStage("end")}>
                Читать дальше
              </button>
            </div>
          </>
        )}

        {/* ===== ВОПРОСЫ ТЕМА 2 ===== */}
        {stage === "q2" && (
          <>
            <div className="note">
              Эти вопросы не для ответа «правильно».  
              Они для прояснения.
            </div>

            {[
              {
                key: "outside",
                label: "Я переживаю из-за того, что не могу изменить",
                question:
                  "Что именно сейчас не зависит от тебя, но продолжает забирать энергию?",
              },
              {
                key: "inside",
                label: "Я не использую то, что в моей власти",
                question:
                  "На что ты реально можешь повлиять, но откладываешь это?",
              },
              {
                key: "accept",
                label: "Мне сложно принять ограничения",
                question:
                  "Что изменится, если ты перестанешь бороться с этим фактом?",
              },
            ].map(item => (
              <div key={item.key}>
                <div
                  className={`choice ${selected2 === item.key ? "active" : ""}`}
                  onClick={() => setSelected2(item.key)}
                >
                  {item.label}
                </div>

                {selected2 === item.key && (
                  <div className="question">{item.question}</div>
                )}
              </div>
            ))}

            <button
              className="btn primary"
              onClick={() => setStage("end")}
            >
              Продолжить
            </button>
          </>
        )}

        {/* ===== ЗАВЕРШЕНИЕ ===== */}
        {stage === "end" && (
          <>
            <div className="spacer" />

            <div className="text">
{`Если ты дошёл до этого места —
значит ты уже смотришь честнее.

Не на то, каким всё должно быть.
А на то, как оно есть.

Из этого места
и появляются реальные шаги.`}
            </div>

            <button className="btn primary" onClick={() => navigate(-1)}>
              Вернуться
            </button>
          </>
        )}
      </div>
    </>
  );
}
