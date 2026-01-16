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
  const [selectedThird, setSelectedThird] = useState(null);
  // ДОБАВЬ В STATE
  const [showFourth, setShowFourth] = useState(false);
  const [selectedFourth, setSelectedFourth] = useState(null);


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

        /* ===== FIXED BACK ===== */
        .back-fixed {
          position: fixed;
          top: calc(env(safe-area-inset-top) + 50px);
          left: 20px;
          font-size: 30px;
          color: #999;
          cursor: pointer;
          z-index: 100;
          user-select: none;
        }

        /* ===== SCREEN ===== */
        .screen {
          width: 100%;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

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
          margin: 26px 0 18px;
          font-size: 13px;
          color: #999;
          text-align: center;
          line-height: 1.45;
        }

        .hint {
          margin: 10px 0 22px;
          font-size: 12px;
          color: #aaa;
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
          font-size: 15px;
          cursor: pointer;
        }

        .primary {
          background: #222;
          color: #fff;
        }

        .secondary {
          background: #f0f0f0;
          color: #222;
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
          margin: 12px 0 10px;
          font-size: 14px;
          line-height: 1.55;
          color: #444;
        }

        .spacer {
          height: 60px;
        }
      `}</style>

      {/* ← FIXED BACK */}
      <div className="back-fixed" onClick={() => navigate(-1)}>←</div>

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
              Выбирай не «правильный», а честный вариант.
            </div>

            <div className="actions">
              <button className="btn primary" onClick={() => setPhase("questions")}>
                Погрузиться глубже
              </button>
              <button className="btn secondary" onClick={() => setPhase("next")}>
                Читать дальше
              </button>
            </div>
          </>
        )}

        {phase === "questions" && (
          <>
            <div className="note">
              Отвечай мысленно или запиши.  
              Здесь нет задачи «сделать правильно».
            </div>

            {[
              {
                key: "lost",
                label: "Я не понимаю, в какой момент всё поехало",
                question:
                  "Если вернуться назад — где ты впервые почувствовал, что делаешь усилие, а отклика уже нет?",
                hint:
                  "Это не про поиск ошибки. Это про момент, где ты перестал слышать себя."
              },
              {
                key: "pressure",
                label: "Я всё время давлю на себя",
                question:
                  "Что ты от себя требуешь сейчас — и кто впервые сказал тебе, что так «надо»?",
                hint:
                  "Иногда давление — это не твой голос, а давно усвоенный чужой."
              },
              {
                key: "confusion",
                label: "Я не понимаю, куда дальше идти",
                question:
                  "Если убрать ожидания и страхи — чего ты на самом деле хочешь в этой ситуации?",
                hint:
                  "Ответ может быть тихим и неуверенным — это нормально."
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
                  <>
                    <div className="question">{item.question}</div>
                    <div className="hint">{item.hint}</div>
                  </>
                )}
              </div>
            ))}

            <button className="btn primary" onClick={() => setPhase("next")}>
              Я готов идти дальше
            </button>
          </>
        )}

        {/* ===== ТЕМА 2 ===== */}
        {phase === "next" && !showThird && (
          <>
            <div className="spacer" />

            <div className="title">Где заканчивается твой контроль</div>

            <div className="text">
{`Есть одна вещь, которая почти всегда усиливает застревание.

Ты продолжаешь пытаться контролировать то,
что уже не зависит от тебя.

Решения других людей.
Прошлые выборы.
Условия, которые уже сложились.

Чем дольше ты с этим борешься —
тем сильнее ощущение бессилия.

Но контроль — это не «сделать так, чтобы всё получилось».
Контроль — это ясно видеть,
на что ты можешь влиять,
а на что — нет.

В этот момент давление начинает ослабевать.
Не потому что стало легче.
А потому что стало честнее.`}
            </div>

            {!showSecondQuestions && (
              <div className="actions">
                <button
                  className="btn primary"
                  onClick={() => setShowSecondQuestions(true)}
                >
                  Погрузиться глубже
                </button>
                <button
                  className="btn secondary"
                  onClick={() => setShowThird(true)}
                >
                  Читать дальше
                </button>
              </div>
            )}

            {showSecondQuestions && (
              <>
                <div className="note">
                  Эти вопросы помогают отпустить лишнее,
                  а не «собраться».
                </div>

                {[
                  {
                    key: "not_control",
                    label: "Я держусь за то, что не могу изменить",
                    question:
                      "Что ты продолжаешь прокручивать в голове, хотя это уже произошло?",
                    hint:
                      "Отпустить — не значит согласиться. Это значит перестать тратить на это силы."
                  },
                  {
                    key: "real_control",
                    label: "Я не вижу, где у меня есть влияние",
                    question:
                      "На что ты реально можешь повлиять в ближайшие 24 часа?",
                    hint:
                      "Иногда контроль — это один маленький конкретный шаг."
                  },
                  {
                    key: "fear",
                    label: "Мне страшно отпустить контроль",
                    question:
                      "Что ты боишься почувствовать, если перестанешь всё удерживать?",
                    hint:
                      "Страх — не знак ошибки. Это знак соприкосновения с реальностью."
                  },
                ].map((item) => (
                  <div key={item.key}>
                    <div
                      className={`choice ${selectedSecond === item.key ? "active" : ""}`}
                      onClick={() => setSelectedSecond(item.key)}
                    >
                      {item.label}
                    </div>

                    {selectedSecond === item.key && (
                      <>
                        <div className="question">{item.question}</div>
                        <div className="hint">{item.hint}</div>
                      </>
                    )}
                  </div>
                ))}

                <button className="btn primary" onClick={() => setShowThird(true)}>
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
{`Даже если ситуация была тяжёлой,
она не прошла впустую.

Опыт — это не вывод «я справился».
Иногда это честное:
«я понял, где мне было сложно».

И этого уже достаточно,
чтобы в следующий раз идти иначе.`}
            </div>

            {[
              {
                key: "see",
                label: "Я стал лучше понимать себя",
                question:
                  "Что в этой ситуации показало тебе твои реальные границы?",
                hint:
                  "Границы — это не слабость. Это ориентиры."
              },
              {
                key: "repeat",
                label: "Я увидел повторяющийся сценарий",
                question:
                  "В каких похожих ситуациях ты уже был раньше?",
                hint:
                  "Повтор — это не ошибка. Это приглашение к осознанности."
              },
              {
                key: "next_step",
                label: "Я понимаю, как могу поступить иначе",
                question:
                  "Какой самый простой шаг ты сделаешь в следующий раз?",
                hint:
                  "Он может выглядеть слишком маленьким — и это нормально."
              },
            ].map((item) => (
              <div key={item.key}>
                <div
                  className={`choice ${selectedThird === item.key ? "active" : ""}`}
                  onClick={() => setSelectedThird(item.key)}
                >
                  {item.label}
                </div>

                {selectedThird === item.key && (
                  <>
                    <div className="question">{item.question}</div>
                    <div className="hint">{item.hint}</div>
                  </>
                )}
              </div>
            ))}

            {/* ===== ТЕМА 4 ===== */}
{showFourth && (
  <>
    <div className="spacer" />

    <div className="title">Маленькое движение вместо большого решения</div>

    <div className="text">
{`После ясности часто приходит странное состояние.

Ты вроде бы понял больше.
Стало честнее.
Но вместе с этим —
пропало желание что-то резко решать.

И это нормально.

Тебе не нужно «собраться».
Не нужно «взять себя в руки».
Не нужно делать шаг,
который должен что-то доказать.

Сейчас важно другое —
не результат,
а ощущение движения.`}
    </div>

    <div className="note">
      Эти вопросы не про дисциплину.  
      Они про заботу и устойчивость.
    </div>

    {[
      {
        key: "relief",
        label: "Я хочу немного выдохнуть",
        question:
          "Что ты можешь сделать сегодня, чтобы стало чуть легче, а не «лучше»?",
        hint:
          "Иногда движение — это не шаг вперёд, а снятие лишнего."
      },
      {
        key: "tiny",
        label: "Я готов к очень маленькому шагу",
        question:
          "Какое действие займёт не больше 5 минут и не потребует усилий?",
        hint:
          "Если шаг кажется слишком простым — значит он подходит."
      },
      {
        key: "care",
        label: "Мне важно не сломать себя",
        question:
          "Как ты можешь поддержать себя, а не толкать?",
        hint:
          "Поддержка — это тоже форма движения."
      },
    ].map((item) => (
      <div key={item.key}>
        <div
          className={`choice ${selectedFourth === item.key ? "active" : ""}`}
          onClick={() => setSelectedFourth(item.key)}
        >
          {item.label}
        </div>

        {selectedFourth === item.key && (
          <>
            <div className="question">{item.question}</div>
            <div className="hint">{item.hint}</div>
          </>
        )}
      </div>
    ))}

    
  </>
)}


            <button className="btn primary" onClick={() => navigate(-1)}>
              Завершить
            </button>
          </>
        )}
      </div>
    </>
  );
}
