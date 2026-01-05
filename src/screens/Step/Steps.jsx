import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";



const PHRASES = [
  "Ты уже двигался. Это считается.",
  "Даже попытка — это шаг.",
  "Ты не исчез. Ты пробовал.",
  "Иногда шаг — это просто вернуться.",
  "Не идеально. Зато по-настоящему.",

  "Начать с начала — не значит откатиться. Это значит снова продолжить.",
  "Не каждый шаг приводит к финишу. Но каждый шаг оставляет опыт.",
  "Иногда прогресс — это просто вернуться. Без давления и ожиданий.",
  "Ты уже сделал больше, чем ничего. И это остаётся с тобой.",
  "Здесь можно начинать заново столько раз, сколько нужно.",

  "Начать с начала — это про устойчивость. Про умение не исчезать, когда сложно.",
  "Здесь не важно, как далеко ты дошёл. Важно, что ты возвращаешься.",
  "Движение не всегда выглядит как успех. Иногда оно выглядит как попытка.",
  "Ты можешь начинать заново столько раз, сколько потребуется. Это не слабость.",
  "Каждый раз, когда ты начинаешь — ты выбираешь себя.",

  "Если у тебя есть мечта — защищай её. Даже от собственных сомнений.",
  "Иногда всё, что у тебя есть — это попытка. Но именно с неё всё начинается.",
  "Настойчивость — это не скорость. Это умение продолжать.",
  "Дело не в том, сколько раз ты падаешь. А в том, что ты продолжаешь идти.",
  "Иногда результат требует времени. И твоего присутствия.",
];



export default function Steps() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);

  /* ===== LEVEL SYSTEM (как в Home) ===== */

  const LEVELS = [
    { level: 1, from: 0, to: 150 },
    { level: 2, from: 150, to: 370 },
    { level: 3, from: 370, to: 656 },
    { level: 4, from: 656, to: 1028 },
    { level: 5, from: 1028, to: 1511 },
    { level: 6, from: 1511, to: 2139 },
    { level: 7, from: 2139, to: 2955 },
    { level: 8, from: 2955, to: 4016 },
    { level: 9, from: 4016, to: 5395 },
    { level: 10, from: 5395, to: 7189 },
  ];

  const hp = user?.hp ?? 0;

  const currentLevel =
    LEVELS.find((l) => hp >= l.from && hp < l.to) ||
    LEVELS[LEVELS.length - 1];

  const progress =
    ((hp - currentLevel.from) /
      (currentLevel.to - currentLevel.from)) *
    100;

  const safeProgress = Math.min(Math.max(progress, 0), 100);

  const [startedCount, setStartedCount] = useState(0);

  useEffect(() => {
  if (!user?.telegram_id) return;

  async function loadStarted() {
    const { count, error } = await supabase
      .from("steps")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.telegram_id);

    if (!error) {
      setStartedCount(count ?? 0);
    }
  }

  loadStarted();
}, [user?.telegram_id]);


    const [phrase, setPhrase] = useState("");

    useEffect(() => {
  const periodKey = Math.floor(Date.now() / (1000 * 60 * 60 * 48)); // 2 дня
  const storageKey = "steps_phrase_" + periodKey;

  const saved = localStorage.getItem(storageKey);
  if (saved) {
    setPhrase(saved);
    return;
  }

  const random =
    PHRASES[Math.floor(Math.random() * PHRASES.length)];

  localStorage.setItem(storageKey, random);
  setPhrase(random);
}, []);


    function rotatePhrase() {
  const currentIndex = PHRASES.indexOf(phrase);
  const nextIndex =
    currentIndex === -1 || currentIndex === PHRASES.length - 1
      ? 0
      : currentIndex + 1;

  setPhrase(PHRASES[nextIndex]);
}




  const [completedCount, setCompletedCount] = useState(0);

  async function loadCompleted() {
  const { count, error } = await supabase
    .from("steps")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.telegram_id)
    .eq("result", "completed");

  if (!error) {
    setCompletedCount(count ?? 0);
  }
}

loadCompleted();


  const [almostCount, setAlmostCount] = useState(0);

  async function loadAlmost() {
  const { count, error } = await supabase
    .from("steps")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.telegram_id)
    .eq("result", "almost");

  if (!error) {
    setAlmostCount(count ?? 0);
  }
}

loadAlmost();


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
        .screen {
          width: 100%;
          height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          /* ВАЖНО: это ровно как в Home */
          padding: calc(env(safe-area-inset-top) + 40px) 20px 30px;

          box-sizing: border-box;
          max-width: 520px;
          margin: 0 auto;
        }

        /* ===== TOP PILL (1:1 как Home) ===== */

        .top-pill-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 60px;
          margin-bottom: 40px;
        }

        .top-pill {
          width: 82%;
          max-width: 480px;
          height: 48px;
          background: #fff;
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }

        .left, .right {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #555;
        }

        .icon {
          width: 22px;
          height: 22px;
          opacity: 0.9;
        }

        .separator {
          flex: 1;
          height: 4px;
          max-width: 90px;
          background: #d4d4d4;
          border-radius: 2px;
          margin: 0 14px;
          opacity: 0.55;
        }

        /* ===== CONTENT ===== */

        .content {
          width: 100%;
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
        }

        .title h1 {
          margin: 0;
          font-size: 28px;
        }

        .title p {
          margin-top: 6px;
          font-size: 14px;
          color: #888;
        }

        .card {
          background: #fff;
          border-radius: 22px;
          padding: 18px;
          margin-bottom: 16px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.06);
        }

        .card-text {
          margin: 14px 0;
          font-size: 14px;
          color: #555;
          line-height: 1.5;
        }

        .stats {
          border-top: 1px solid #eee;
          padding-top: 12px;
        }

        .stat {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .stat span {
          color: #777;
        }

        .insight {
          background: #fafafa;
        }

        /* ===== NAV (как Home) ===== */

        .nav-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 59px;
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
          background: #ffffff;
          opacity: 0.45;
          padding: 0;
          transition: 
            transform 0.22s cubic-bezier(.25,.46,.45,.94),
            opacity .2s ease;
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
        }
      `}</style>

      <div className="screen">

        {/* ===== TOP PILL ===== */}
        <div className="top-pill-container">
          <div className="top-pill">

            <div className="left">
              <svg className="icon" viewBox="0 0 24 24" stroke="#6A6A6A" fill="none" strokeWidth="2">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
              </svg>
              <span>Уровень {currentLevel.level}</span>
            </div>

            <div className="separator">
              <div
                style={{
                  width: `${safeProgress}%`,
                  height: "100%",
                  background: "#ffc400",
                  borderRadius: "2px",
                  transition: "width 0.35s ease",
                }}
              />
            </div>

            <div className="right">
              <svg className="icon" viewBox="0 0 24 24" fill="#FFC400">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
              </svg>
              <span>{user?.od ?? 0} Од</span>
            </div>

          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="content">
          <div className="title">
            <h1>Шаги</h1>
            <p>как ты остаёшься в действии</p>
          </div>

          <div className="card">
            <p className="card-text">
              Здесь будет отражаться твой путь —
              спокойно, без давления и оценок.
            </p>

            <div className="stats">
              <div className="stat">
                <span>Начатые задачи</span>
                <strong>{startedCount}</strong>
              </div>
              <div className="stat">
                <span>Завершённые</span>
                <strong>{completedCount}</strong>
              </div>
              <div className="stat">
                <span>Почти завершенные</span>
                <strong>{almostCount}</strong>
              </div>
            </div>
          </div>

          <div
  className="card insight"
  onClick={rotatePhrase}
  style={{ cursor: "pointer" }}
>
  <p className="card-text">{phrase}</p>
</div>

        </div>

        {/* ===== NAV ===== */}
        <div className="nav-wrapper">
          <div className="nav-pill">

            <button className="nav-item" onClick={() => navigate("/home")}>
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M12 3l8 7v10a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1V10l8-7z"/>
              </svg>
            </button>

            <button className="nav-item active">
              <svg viewBox="0 0 24 24" fill="#6A6A6A">
                <path d="M8 4c-2 0-3.3 1.4-3.3 3.5 0 2.4 2.4 6.2 3.5 6.2S12 10 12 7.5C12 5.4 10.3 4 8 4Z"/>
                <circle cx="8.5" cy="14.8" r="1.3"/>
                <path d="M16 9c-2 0-3.3 1.4-3.3 3.5 0 2.4 2.4 6.2 3.5 6.2s3.8-3.7 3.8-6.2C20 10.4 18.3 9 16 9Z"/>
                <circle cx="16.6" cy="18.5" r="1.3"/>
              </svg>
            </button>

            <button className="nav-item">
              <svg viewBox="0 0 24 24" stroke="#6A6A6A" fill="none" strokeWidth="2">
                <rect x="4" y="7" width="16" height="13" rx="3"/>
                <path d="M9 7V5a3 3 0 0 1 6 0v2"/>
              </svg>
            </button>

            <button className="nav-item">
              <svg viewBox="0 0 24 24" stroke="#6A6A6A" fill="none" strokeWidth="2">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
              </svg>
            </button>

          </div>
        </div>

      </div>
    </>
  );
}
