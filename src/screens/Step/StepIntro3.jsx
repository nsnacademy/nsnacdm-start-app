import { useNavigate } from "react-router-dom";
import StepImage from "../../assets/step3.png";
import { supabase } from "../../lib/supabase";
import { useUserStore } from "../../store/userStore";

export default function StepIntro3() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  async function finishOnboarding() {
    if (!user) return;

    // 🔥 1. Обновляем в Supabase
    await supabase
      .from("users")
      .update({ has_onboarded: true })
      .eq("telegram_id", user.telegram_id);

    // 🔥 2. Обновляем локальный store
    setUser({ ...user, has_onboarded: true });

    // 🔥 3. Переход на главный экран
    navigate("/home");
  }

  return (
    <>
      <style>{`
        .screen {
          width: 100%;
          height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;

          display: flex;
          flex-direction: column;
          align-items: center;

          padding: calc(env(safe-area-inset-top) + 50px) 20px 40px;
          box-sizing: border-box;

          max-width: 520px;
          margin: 0 auto;
        }

        .text-block {
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 14px;
          margin-top: 50px;
        }

        .text-block p {
          font-size: 16px;
          color: #1a1a1a;
          line-height: 1.48;
          margin: 0;
        }

        .text-block strong {
          font-weight: 600;
        }

        .center {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .step-img {
          width: 100%;
          max-width: 740px;
        }

        .bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .next-btn {
          width: 260px;
          height: 56px;
          border: none;
          border-radius: 16px;
          background: #2c2c2e;
          color: #fff;
          font-size: 18px;
        }

        .dots-bottom {
          font-size: 12px;
          color: #222;
        }
      `}</style>

      <div className="screen">
        <div className="text-block">
          <p><strong>Используй ОД</strong>, чтобы открывать инструменты:</p>
          <p>чек-листы, мини-планы, трекеры</p>
          <p>и <strong>другие полезные функции</strong>.</p>
        </div>

        <div className="center">
          <img className="step-img" src={StepImage} alt="step intro 3" />
        </div>

        <div className="bottom">
          <button
            className="next-btn"
            onClick={finishOnboarding}
          >
            Начать с начала
          </button>
          <div className="dots-bottom">● ● ● ●</div>
        </div>
      </div>
    </>
  );
}
