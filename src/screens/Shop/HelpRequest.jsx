import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HelpRequest() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [showChoice, setShowChoice] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showNextText, setShowNextText] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
/* ===== FIXED HEADER ===== */
.fixed-header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 520px;
  height: 56px;
  background: #f3f3f5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  font-size: 15px;
  color: #777;
}

.fixed-header button {
  position: absolute;
  top: 6px;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  font-size: 20px;
  color: #888;
  cursor: pointer;
}

.fixed-header .back { left: 8px; }
.fixed-header .close { right: 8px; }

/* ===== SCROLL AREA ===== */
.scroll {
  padding-top: 72px;
  padding-bottom: 120px;
}

/* ===== CONTENT ===== */
.content {
  max-width: 460px;
  margin: 0 auto;
  padding: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
}

.content.visible {
  opacity: 1;
  transform: translateY(0);
}

.chapter-title {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 8px;
}

.chapter-subtitle {
  font-size: 14px;
  color: #888;
  margin-bottom: 24px;
}

.text {
  font-size: 15px;
  line-height: 1.65;
  color: #444;
  white-space: pre-line;
}

/* ===== CHOICE ===== */
.note {
  margin: 48px 0 20px;
  font-size: 14px;
  color: #777;
  text-align: center;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action {
  background: #e9e9ec;
  padding: 14px;
  border-radius: 20px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
}

/* ===== QUESTIONS ===== */
.questions {
  margin-top: 32px;
  animation: expand 0.4s ease forwards;
}

@keyframes expand {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.care {
  font-size: 14px;
  color: #888;
  line-height: 1.5;
  margin-bottom: 16px;
}

.choice {
  background: #e9e9ec;
  padding: 14px;
  border-radius: 16px;
  margin-bottom: 10px;
  cursor: pointer;
}

.choice.active {
  background: #dedee3;
}

.question {
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.6;
  color: #444;
}

.continue {
  margin-top: 24px;
  padding: 14px;
  background: #e9e9ec;
  border-radius: 20px;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
}

/* ===== NEXT TEXT ===== */
.next-text {
  margin-top: 64px;
  animation: expand 0.5s ease forwards;
}
      `}</style>

      {/* FIXED HEADER */}
      <div className="fixed-header">
        Первый шаг
        <button className="back" onClick={() => navigate(-1)}>←</button>
        <button className="close" onClick={() => navigate(-1)}>✕</button>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="scroll">
        <div className={`content ${visible ? "visible" : ""}`}>
          <div className="chapter-title">Точка застревания</div>
          <div className="chapter-subtitle">
            Момент, где что-то идёт не так
          </div>

          <div className="text">
{`Если ты читаешь это —
значит внутри уже не просто тяжело.

Это то состояние, где ты вроде бы функционируешь,
что-то делаешь,
куда-то идёшь,
но внутри постоянно крутится одна мысль:

«Я застрял».`}
          </div>

          {showChoice && (
            <>
              <div className="note">
                Дальше можно пойти по-разному.
                Выбери то, что сейчас комфортнее.
              </div>

              <div className="actions">
                <div
                  className="action"
                  onClick={() => {
                    setShowQuestions(true);
                    setShowChoice(false);
                  }}
                >
                  ⌄ Погрузиться глубже
                </div>

                <div
                  className="action"
                  onClick={() => {
                    setShowNextText(true);
                    setShowChoice(false);
                  }}
                >
                  → Просто читать дальше
                </div>
              </div>
            </>
          )}

          {showQuestions && (
            <div className="questions">
              <div className="care">
                Можно ответить мысленно
                или записать на бумаге.
              </div>

              {[
                { key: "lost", label: "Я не понимаю, где всё пошло не так" },
                { key: "anger", label: "Я злюсь на себя" },
                { key: "deadend", label: "Я чувствую тупик" },
              ].map(item => (
                <div
                  key={item.key}
                  className={`choice ${selected === item.key ? "active" : ""}`}
                  onClick={() => setSelected(item.key)}
                >
                  {item.label}
                </div>
              ))}

              {selected && (
                <div className="question">
                  Где был момент, после которого ситуация
                  перестала быть управляемой?
                </div>
              )}

              <div
                className="continue"
                onClick={() => setShowNextText(true)}
              >
                Я готов идти дальше →
              </div>
            </div>
          )}

          {showNextText && (
            <div className="next-text text">
{`Следующая тема начинается здесь.
И она уже про другое состояние —
когда ясность начинает заменять давление.`}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
