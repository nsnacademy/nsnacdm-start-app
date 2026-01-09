import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { saveUser } from "../../lib/saveUser";

export default function FounderRequest() {
  const navigate = useNavigate();

  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    free: "",
    feeling: "",
    tried: "",
  });

  return (
    <>
      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; }

        .screen {
          width: 100%;
          height: 100vh;
          background: #f8f8f8;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: calc(env(safe-area-inset-top) + 20px) 20px 20px;
          max-width: 520px;
          margin: 0 auto;
        }

        .card {
          width: 100%;
          background: #fff;
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }

        .title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .sub {
          font-size: 14px;
          color: #777;
          margin-bottom: 14px;
          line-height: 1.45;
        }

        .divider {
          height: 1px;
          background: #eee;
          margin: 16px 0;
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

        .back {
          margin-top: 12px;
          text-align: center;
          font-size: 13px;
          color: #999;
          cursor: pointer;
        }

        .block {
          margin-bottom: 18px;
        }

        .label {
          font-size: 13px;
          color: #999;
          margin-bottom: 6px;
        }

        textarea {
          width: 100%;
          border-radius: 14px;
          border: 1px solid #e5e5e5;
          padding: 12px 14px;
          font-size: 14px;
          resize: none;
          outline: none;
          font-family: inherit;
        }

        textarea::placeholder {
          color: #bbb;
        }
      `}</style>

      <div className="screen">

        {/* ===== CONSENT STEP ===== */}
        {!user?.has_onboarded && (
          <div className="card">
            <div className="title">Важно</div>

            <div className="sub">
              Перед началом важно сказать.
              <br /><br />
              Используя приложение, ты даёшь согласие
              на обработку персональных данных
              в соответствии с 152-ФЗ РФ.
              <br /><br />
              Я обрабатываю:
              <br />— Telegram ID  
              <br />— шаги и прогресс  
              <br />— данные, которые ты сам вводишь
              <br /><br />
              Данные используются только
              для работы приложения и навигации по твоему запросу.
              Я не передаю их третьим лицам.
              <br /><br />
              Данные могут обрабатываться
              с использованием зарубежных сервисов хранения.
              <br /><br />
              Ты можешь в любой момент
              попросить удалить свои данные.
            </div>

            <button
              className="btn primary"
              onClick={async () => {
                const updatedUser = {
                  ...user,
                  has_onboarded: true,
                };

                setUser(updatedUser);
                await saveUser(updatedUser);
              }}
            >
              Понятно, продолжить
            </button>
          </div>
        )}

        {/* ===== ОСНОВНОЙ FLOW ===== */}
        {user?.has_onboarded && (
          <>
            {/* STEP 0 */}
            {step === 0 && (
              <div className="card">
                <div className="title">Перед тем как обратиться</div>
                <div className="sub">
                  Я не даю мотивацию и не раздаю советы.
                </div>

                <div className="divider" />

                <div className="sub">
                  Обычно сюда приходят, когда:
                  <br />— делают шаги, но не чувствуют движения  
                  <br />— стараются, но не понимают, где ошибка  
                  <br />— не ясно, продолжать или начинать заново
                </div>

                <div className="divider" />

                <button
                  className="btn primary"
                  onClick={() => setStep(1)}
                >
                  Это про меня
                </button>

                <div className="back" onClick={() => navigate(-1)}>
                  Вернуться
                </div>
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div className="card">
                <div className="title">Что здесь происходит</div>

                <div className="sub">
                  Это не консультация и не мотивационная сессия.
                </div>

                <div className="sub">
                  Я внимательно читаю твой запрос и понимаю,
                  могу ли быть тебе полезен.
                </div>

                <div className="divider" />

                <div className="sub">
                  Если понимаю, что могу помочь —
                  я напишу тебе и предложу формат дальнейшей работы.
                  <br />
                  Если нет — честно скажу об этом.
                </div>

                <div className="sub">
                  Этот этап — вход в диалог.
                  <br />
                  Его стоимость — <b>1990 ₽</b>.
                  <br />
                  Оплата — только если ты решишь продолжить.
                  <br /><br />
                  Это временный формат запуска.
                  Он не будет доступен постоянно.
                </div>

                <div className="divider" />

                <div className="sub">
                  Если сейчас это не откликается — это нормально.
                  <br />
                  Я вижу твои усилия.
                  <br /><br />
                  Продолжай идти вперёд — я сам свяжусь с тобой.
                </div>

                <div className="divider" />

                <button
                  className="btn primary"
                  onClick={() => setStep(2)}
                >
                  Перейти к запросу
                </button>

                <div className="back" onClick={() => setStep(0)}>
                  Назад
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="card">
                <div className="title">Опиши ситуацию</div>
                <div className="sub">
                  Можно писать свободно.
                  Иногда уже это даёт первую ясность.
                </div>

                <div className="divider" />

                <div className="block">
                  <div className="label">
                    Что сейчас происходит? Где чувствуешь застой?
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Опиши как есть: что не идёт, где теряется движение…"
                    value={form.free}
                    onChange={(e) =>
                      setForm({ ...form, free: e.target.value })
                    }
                  />
                </div>

                <div className="block">
                  <div className="label">
                    Что ты при этом чувствуешь?
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Растерянность, давление, усталость…"
                    value={form.feeling}
                    onChange={(e) =>
                      setForm({ ...form, feeling: e.target.value })
                    }
                  />
                </div>

                <div className="block">
                  <div className="label">
                    Что ты уже пробовал?
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Подходы, планы, паузы, дисциплину…"
                    value={form.tried}
                    onChange={(e) =>
                      setForm({ ...form, tried: e.target.value })
                    }
                  />
                </div>

                <button
                  className="btn primary"
                  onClick={() => setStep(3)}
                >
                  Отправить запрос
                </button>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="card">
                <div className="title">Запрос принят</div>
                <div className="sub">
                  Я получил твой текст.
                  <br />
                  Внимательно его прочитаю и напишу тебе.
                  <br />
                  Обычно это занимает до 24 часов.
                </div>

                <button
                  className="btn"
                  style={{
                    marginTop: 20,
                    background: "transparent",
                    color: "#222",
                  }}
                  onClick={() => navigate("/home")}
                >
                  В главное меню
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
