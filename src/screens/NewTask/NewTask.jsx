import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti"; // 🎉 конфетти библиотека
import { useTaskStore } from "../../store/taskStore";

export default function NewTask() {
  const navigate = useNavigate();
  const addTask = useTaskStore((s) => s.addTask);

  // ===== REWARD VALUES =====
  const [task, setTask] = useState("");
  const [selectedTime, setSelectedTime] = useState(10);

  const [reward, setReward] = useState(10); // ОД = время
  const [hp, setHp] = useState(25);        // ХП = время * 2.5

  const [animatedReward, setAnimatedReward] = useState(10);
  const [animatedHp, setAnimatedHp] = useState(25);

  const times = [10, 20, 30, 40, 50, 60];

  // ===== SMOOTH NUMBER ANIMATION =====
  function animateValue(from, to, setter, duration = 350) {
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = from + (to - from) * progress;
      setter(Math.round(value));

      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  // animate on first render
  useEffect(() => {
    const initialReward = selectedTime;
    const initialHp = Math.round(selectedTime * 2.5);

    setReward(initialReward);
    setHp(initialHp);

    animateValue(0, initialReward, setAnimatedReward);
    animateValue(0, initialHp, setAnimatedHp);
  }, []);

  // =====================================================
  // 🎯 ВЫЛЕТ ИЗ КНОПКИ "Добавить"
  // =====================================================
  function getOrigin() {
    const btn = document.querySelector(".add-btn");
    if (!btn) return { x: 0.5, y: 0.5 };

    const rect = btn.getBoundingClientRect();

    return {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight
    };
  }

  // =====================================================
  // 🎉 УРОВНИ КОНФЕТТИ ПО ВРЕМЕНИ (10 → 60 минут)
  // =====================================================
  function fireConfettiByTime(t) {
    const origin = getOrigin();

    if (t === 10) {
      confetti({
        particleCount: 40,
        spread: 45,
        startVelocity: 18,
        scalar: 0.7,
        origin
      });
    }

    if (t === 20) {
      confetti({
        particleCount: 70,
        spread: 60,
        startVelocity: 25,
        scalar: 0.8,
        origin
      });
    }

    if (t === 30) {
      confetti({
        particleCount: 100,
        spread: 80,
        startVelocity: 32,
        gravity: 0.9,
        scalar: 1,
        origin
      });
    }

    if (t === 40) {
      confetti({
        particleCount: 140,
        spread: 100,
        startVelocity: 38,
        scalar: 1.1,
        origin
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 140,
          startVelocity: 28,
          scalar: 1,
          origin
        });
      }, 250);
    }

    if (t === 50) {
      confetti({
        particleCount: 160,
        spread: 120,
        startVelocity: 45,
        scalar: 1.2,
        gravity: 0.85,
        origin
      });

      setTimeout(() => {
        confetti({
          particleCount: 130,
          spread: 160,
          startVelocity: 32,
          scalar: 1.2,
          gravity: 0.9,
          origin
        });
      }, 220);
    }

    if (t === 60) {
      // основной золотой взрыв
      confetti({
        particleCount: 200,
        spread: 130,
        startVelocity: 55,
        scalar: 1.3,
        gravity: 0.8,
        colors: ["#FFD700", "#FFE680", "#FFF2B0"],
        origin
      });

      // золотые лучи слева
      setTimeout(() => {
        confetti({
          particleCount: 130,
          spread: 160,
          startVelocity: 40,
          scalar: 1.3,
          gravity: 0.9,
          colors: ["#FFD700", "#FFF4B8"],
          origin
        });
      }, 200);

      // золотые лучи справа
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 160,
          startVelocity: 40,
          scalar: 1.25,
          gravity: 0.9,
          colors: ["#FFD700", "#FFF4B8"],
          origin
        });
      }, 380);

      // золотая пыль (эпилог)
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 90,
          startVelocity: 22,
          scalar: 0.9,
          gravity: 1.1,
          ticks: 260,
          colors: ["#FFF9D6", "#FFD700"],
          origin
        });
      }, 600);
    }
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        /* ===== SCREEN (1:1 как Home) ===== */
        .new-screen {
          width: 100%;
          min-height: 100vh;
          background: #f8f8f8;
        
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          padding: calc(env(safe-area-inset-top) + 40px) 20px 30px;
          box-sizing: border-box;
          max-width: min(520px, 100%);
          margin: 0 auto;
        }

        /* ===== HEADER ZONE ===== */
        .header-zone {
          width: 92%;
          max-width: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-top: 60px;
          margin-bottom: 15px;
        }

        .back-btn {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 8px;
        }

        .back-btn svg {
          width: 28px;
          height: 28px;
          stroke: #444;
        }

        .screen-title {
          font-size: 20px;
          font-weight: 600;
          color: #2c2c2c;
          text-align: center;
          line-height: 28px;
        }

        /* ===== CENTER WRAPPER ===== */
        .center-wrapper {
          width: 92%;
          max-width: 480px;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 40px;
        }

        /* ===== TASK BOX ===== */
        .task-box {
          width: 100%;
          background: #fff;
          border-radius: 26px;
          padding: 22px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          margin-bottom: 25px;
          position: relative;
        }

        .input {
          width: 100%;
          height: 48px;
          border-radius: 16px;
          border: none;
          background: #f1f1f1;
          padding: 0 16px;
          font-size: 16px;
          outline: none;
          margin-bottom: 8px;
        }

        .char-counter {
          font-size: 13px;
          color: #999;
          text-align: right;
          padding-right: 4px;
          margin-bottom: 20px;
          height: 18px;
        }

        .char-counter.warning {
          color: #ff6b6b;
        }

        .label {
          font-size: 15px;
          color: #555;
          margin-bottom: 14px;
        }

        /* ===== TIME BUTTONS ===== */
        .time-row {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .time-btn {
          height: 42px;
          padding: 0 16px;
          border-radius: 16px;
          border: none;
          background: #f2f2f2;
          font-size: 15px;
          color: #444;
          transition: 0.18s;
          flex: 1;
          min-width: calc(33.333% - 7px);
          max-width: calc(33.333% - 7px);
        }

        .time-btn.active {
          background: #262626;
          color: white;
        }

        /* ===== REWARD BOX ===== */
        .reward-box {
          width: 100%;
          background: #fff;
          border-radius: 26px;
          padding: 20px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 30px;
        }

        .reward-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: #f1f1f1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .reward-icon svg {
          width: 26px;
          height: 26px;
          fill: #FFC400;
        }

        .reward-text-group {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          min-width: 0;
        }

        .reward-main {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          line-height: 1.3;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .reward-sub {
          font-size: 13px;
          color: #777;
          margin-top: 2px;
        }

        /* ===== ADD BUTTON ===== */
        .add-btn {
          width: 240px;
          height: 52px;
          background: #222;
          color: white;
          font-size: 17px;
          border-radius: 16px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 60px;
          box-shadow: 0 6px 14px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: background 0.2s;
        }

        .add-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          box-shadow: none;
        }

        .add-btn:not(:disabled):hover {
          background: #333;
        }

        /* ===== NAV WRAPPER (1:1 как Home) ===== */
        .nav-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          
        }

        .nav-pill {
          width: 92%;
          max-width: 520px;
          height: 75px;
          background: #ffffff;
          border-radius: 28px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
        }

        .nav-item {
          border: none;
          background: none;
          opacity: 0.45;
          transition: 
            transform 0.22s cubic-bezier(.25,.46,.45,.94),
            opacity .2s ease;
          cursor: pointer;
          padding: 0;
        }

        .nav-item.active {
          opacity: 1;
        }

        .nav-item:active {
          transform: translateY(-4px) scale(1.15);
          opacity: 0.85;
        }

        .nav-item svg {
          width: 32px;
          height: 32px;
          transition: transform .22s cubic-bezier(.25,.46,.45,.94);
        }

        .nav-item:active svg {
          transform: scale(1.15);
        }
      `}</style>

      <div className="new-screen">

        {/* HEADER */}
        <div className="header-zone">
          <div className="back-btn" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" stroke="#444" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="screen-title">Новая задача</div>
        </div>

        {/* CENTER */}
        <div className="center-wrapper">

          <div className="task-box">
            <input
              className="input"
              placeholder="минимум 6 символов)"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            
            <div className={`char-counter ${task.trim().length < 5 ? 'warning' : ''}`}>
              {task.trim().length}/∞ символов
            </div>

            <div className="label">Запланированное время</div>

            <div className="time-row">
              {times.map((t) => (
                <button
                  key={t}
                  className={`time-btn ${selectedTime === t ? "active" : ""}`}
                  onClick={() => {
                    const newReward = t;
                    const newHp = Math.round(t * 2.5);

                    setSelectedTime(t);
                    setReward(newReward);
                    setHp(newHp);

                    animateValue(animatedReward, newReward, setAnimatedReward);
                    animateValue(animatedHp, newHp, setAnimatedHp);
                  }}
                >
                  {t} мин
                </button>
              ))}
            </div>
          </div>

          {/* REWARD BLOCK */}
          <div className="reward-box">
            <div className="reward-icon">
              <svg viewBox="0 0 24 24">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
              </svg>
            </div>

            <div className="reward-text-group">
              <div className="reward-main">+{animatedReward} ОД маленькая победа</div>
              <div className="reward-sub">{animatedHp} xp</div>
            </div>
          </div>

          {/* ADD BUTTON → FIRE CONFETTI */}
          <button
            className="add-btn"
            disabled={task.trim().length < 5}
            onClick={() => {
              const title = task.trim();

              // ❗ Защита: минимум 6 символов
              if (title.length <5) return;

              // Создаём объект задачи
              const newTask = {
                id: Date.now(),
                title: title,          // ← используем уже очищенный title
                time: selectedTime,
                od: animatedReward,
                hp: animatedHp,
              };

              // Сохраняем задачу в Zustand
              addTask(newTask);

              // Конфетти
              fireConfettiByTime(selectedTime);

              // Переход домой
              setTimeout(() => {
                navigate("/home");
              }, 400);
            }}
          >
            Добавить
          </button>

        </div>

        {/* NAVIGATION (1:1 как Home) */}
        <div className="nav-wrapper">
          <div className="nav-pill">

            <button className="nav-item" onClick={() => navigate("/home")}>
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M12 3l8 7v10a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1V10l8-7z"/>
              </svg>
            </button>

            <button className="nav-item" onClick={() => navigate("/steps")}>
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M8 4c-2 0-3.3 1.4-3.3 3.5 0 2.4 2.4 6.2 3.5 6.2S12 10 12 7.5C12 5.4 10.3 4 8 4Z"/>
                <circle cx="8.5" cy="14.8" r="1.3"/>
                <path d="M16 9c-2 0-3.3 1.4-3.3 3.5 0 2.4 2.4 6.2 3.5 6.2s3.8-3.7 3.8-6.2C20 10.4 18.3 9 16 9Z"/>
                <circle cx="16.6" cy="18.5" r="1.3"/>
              </svg>
            </button>

            <button className="nav-item" onClick={() => navigate("/shop")}>
              <svg
                viewBox="0 0 24 24"
                stroke="#6A6A6A"
                fill="none"
                strokeWidth="2"
              >
                <rect x="4" y="7" width="16" height="13" rx="3" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
            </button>

            <button
  className="nav-item"
  onClick={() => navigate("/profile")}
>
  <svg
    viewBox="0 0 24 24"
    stroke="#6A6A6A"
    fill="none"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
</button>


          </div>
        </div>

      </div>
    </>
  );
}