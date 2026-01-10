import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HelpRequest() {
  const navigate = useNavigate();
  const [stage, setStage] = useState("intro"); // intro | reading
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const chapters = [
    {
      title: "Правда, с которой всё начинается",
      subtitle: "Почему желание не превращается в движение",
      text: `Ты хочешь многое.
Иногда настолько многое, что пугаешься масштаба своих желаний.

Ты видишь альтернативную версию своей жизни —
более собранную, более реализованную, более живую.
И именно поэтому почти ничего не делаешь.

Проблема не в отсутствии целей.
Проблема в том, что каждая цель слишком большая,
и любое реальное действие на её фоне
выглядит мелким и недостойным этой картины.

Ты хочешь начать красиво.
А реальность всегда начинается некрасиво.`,
    },
    {
      title: "Почему ты всё время «готовишься»",
      subtitle: "И почему это кажется правильным",
      text: `Тебе кажется, что ты ещё не начал.
Но на самом деле ты давно в процессе —
в процессе подготовки.

Ты читаешь, размышляешь, смотришь, как делают другие.
Ты понимаешь, как всё должно работать в теории.

И каждый раз внутри звучит:
«Я начну, когда буду готов».

Но правда в другом.
Ты не начинаешь не из-за неготовности,
а потому что первый шаг разрушает иллюзию,
что ты уже почти тот, кем хочешь быть.`,
    },
    {
      title: "Самое неприятное наблюдение",
      subtitle: "Момент, где теряется уважение к себе",
      text: `Если быть честным —
ты уже много раз выбирал не делать.

Не потому что не мог.
А потому что маленький шаг
не совпадал с образом себя в голове.

Ты сохранял ощущение
«я человек с потенциалом»,
вместо того чтобы столкнуться с реальностью —
неловкой, слабой, несовершенной.

И каждый такой выбор
медленно подтачивал уважение к себе.`,
    },
    {
      title: "Иллюзия «я просто ещё не начал»",
      subtitle: "Почему первый шаг пугает",
      text: `Пока ты не начал —
о тебе нельзя сделать окончательный вывод.

Ты остаёшься в подвешенном состоянии:
умный, способный, перспективный.
Потенциально — кем угодно.

Первый шаг опасен именно этим.
Он переводит тебя из «мог бы»
в «вот что я реально делаю сейчас».

И это страшно.
Потому что может не совпасть с ожиданиями.`,
    },
    {
      title: "Почему большие цели тебя парализуют",
      subtitle: "Когда мечта начинает давить",
      text: `Большая цель редко мотивирует.
Чаще она давит.

Она каждый день напоминает,
насколько ты далёк от желаемого.
И на этом фоне маленький шаг
кажется почти издевательством.

Как будто ты предаёшь мечту,
делая что-то слишком незначительное.

В итоге бездействие
кажется менее болезненным, чем движение.`,
    },
    {
      title: "Правда, которую сложно принять",
      subtitle: "О чём обычно молчат",
      text: `Вот истина, от которой обычно отворачиваются:

Ты не ленивый.
Ты застрял в голове.

В голове шаги выглядят уверенными и логичными.
В реальности — неровными и слабыми.

И пока ты живёшь в голове,
желания не двигают тебя вперёд —
они медленно разъедают самооценку.
Потому что ты знаешь:
мог бы сделать хоть что-то.`,
    },
    {
      title: "Почему маленький шаг — единственный выход",
      subtitle: "Что возвращает в реальность",
      text: `Маленький шаг нужен не для результата.
Он нужен, чтобы сломать ожидание.

Он не вдохновляет.
Не выглядит достойно.
Не делает тебя героем.

Зато он делает главное —
возвращает тебя в реальность.

Маленький шаг —
это согласие перестать быть воображаемым
и начать быть настоящим.`,
    },
    {
      title: "Момент, где что-то меняется",
      subtitle: "Сдвиг, который невозможно не заметить",
      text: `В момент первого шага
происходит не прогресс —
происходит сдвиг идентичности.

Ты перестаёшь быть тем,
кто собирается начать,
и становишься тем,
кто уже что-то сделал.

Пусть это мало.
Но внутри это ощущается иначе.
Тебе больше не нужно оправдываться.`,
    },
    {
      title: "Почему здесь важны попытки, а не цели",
      subtitle: "Что действительно двигает вперёд",
      text: `Цели ты ставить умеешь.
Проблема не в этом.

Цели не двигают тебя в моменте.
А попытка — двигает.

Попытка — это не обещание.
Не план.
Не образ будущего.

Это факт.
Ты сделал что-то.
И это нельзя отменить.`,
    },
    {
      title: "Первый шаг, который выглядит недостойно",
      subtitle: "Почему он самый настоящий",
      text: `Первый шаг почти всегда разочаровывает.
Он слишком маленький.
Слишком простой.
Слишком далёкий от идеала.

И именно поэтому он настоящий.

Если ты готов сделать шаг,
который не доказывает силу,
а показывает реальность —
ты готов начать.`,
    },
    {
      title: "Это и есть «Начать с начала»",
      subtitle: "Простое определение",
      text: `Начать с начала —
это отказаться от ожидания,
что однажды ты станешь готовым.

И принять простую вещь:
движение начинается не с уверенности,
а с действия.

Неровного.
Маленького.
Но реального.`,
    },
    {
  title: "Почему появился этот проект",
  subtitle: "Как это получилось на самом деле",
  text: `Этот проект появился не сразу.
Он собирался через попытки.

Его создавал человек,
который много развивался,
читал, пробовал, ошибался —
и долго не видел результата.
Не был разработчиком.
Учился по ходу.

До этого было несколько версий.
Ни одна не сработала так, как хотелось.
Но каждая попытка делала следующий шаг яснее.

Со временем стало понятно:
важен не успех,
а само движение.

Так появилась система.
Не идеальная.
Но живая.`,
},

    {
      title: "Формула, к которой всё свелось",
      subtitle: "Что оказалось важнее всего",
      text: `В какой-то момент стало ясно:

двигает не цель  
не мотивация  
не вдохновение  

А способность видеть и засчитывать свои шаги,
даже когда они выглядят незначительными.

Из этого родилось приложение —
как инструмент,
который помогает не терять движение.`,
    },
    {
      title: "Точка входа",
      subtitle: "С чего всё начинается",
      text: `Если ты здесь —
значит, ты устал хотеть и не начинать.

Тебе не нужно менять жизнь.
Не нужно верить.
Не нужно обещать.

Достаточно одного шага.
Одной попытки.

С неё и начинается всё остальное.`,
    },
  ];

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [current, stage]);

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (current < chapters.length - 1) {
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setCurrent(current + 1);
          window.scrollTo({ top: 0, behavior: "instant" });
          setIsTransitioning(false);
        }, 150);
      }, 100);
    } else {
      // Последняя глава - переход на /new-task
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          navigate("/new-task");
          setIsTransitioning(false);
        }, 150);
      }, 100);
    }
  };

  const handleBack = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (stage === "reading") {
          setStage("intro");
        } else {
          navigate(-1);
        }
        setIsTransitioning(false);
      }, 150);
    }, 100);
  };

  const handleIntroContinue = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setStage("reading");
        setCurrent(0);
        setIsTransitioning(false);
      }, 150);
    }, 100);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body {
          margin: 0;
          background: #f3f3f5;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .screen {
          max-width: 520px;
          margin: 0 auto;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding-top: 100px;
          overflow: hidden;
        }

        .header {
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          font-size: 15px;
          color: #777;
          transition: opacity 0.3s ease;
        }

        .header.hidden {
          opacity: 0;
        }

        .back, .close {
          position: absolute;
          font-size: 20px;
          color: #888;
          cursor: pointer;
          background: none;
          border: none;
          padding: 8px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }

        .back:hover, .close:hover {
          background: rgba(0,0,0,0.05);
        }

        .back { left: 16px; }
        .close { right: 16px; }

        .intro {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          padding: 0 24px;
          opacity: 1;
          transform: translateY(0);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .intro.hidden {
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
        }

        .intro-title {
          font-size: 26px;
          font-weight: 500;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .intro-subtitle {
          font-size: 15px;
          color: #888;
          line-height: 1.5;
          margin-bottom: 32px;
        }

        .intro-action {
          margin-top: 8px;
          background: #e9e9ec;
          padding: 14px 24px;
          border-radius: 20px;
          font-size: 15px;
          cursor: pointer;
          align-self: center;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 180px;
          color: #333;
        }

        .intro-action:hover {
          background: #e0e0e3;
          transform: translateY(-2px);
        }

        .intro-action:active {
          transform: translateY(0);
        }

        .content-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  
  justify-content: center;
}

.content {
  padding: 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
}

        .content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .content.hidden {
          opacity: 0;
          transform: translateY(-20px);
          pointer-events: none;
        }

        .chapter-title {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .chapter-subtitle {
          font-size: 14px;
          color: #888;
          margin-bottom: 24px;
          line-height: 1.4;
        }

        .text {
          font-size: 15px;
          line-height: 1.7;
          color: #444;
          white-space: pre-line;
          margin-bottom: 40px;
        }

        .next {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 15px;
          color: #888;
          cursor: pointer;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding-bottom: 20px;
        }

        .next:hover {
          color: #666;
          transform: translateY(-2px);
        }

        .next:active {
          transform: translateY(0);
        }

        .progress {
          text-align: center;
          font-size: 13px;
          color: #aaa;
          margin-top: 8px;
          opacity: 0.8;
        }

        .transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #f3f3f5;
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
        }

        .transition-overlay.active {
          opacity: 1;
          pointer-events: all;
        }

        @media (max-width: 480px) {
          .intro-title {
            font-size: 24px;
          }
          
          .chapter-title {
            font-size: 20px;
          }
          
          .text {
            font-size: 14px;
            line-height: 1.6;
          }
        }
      `}</style>

      {/* Плавный оверлей для переходов */}
      <div className={`transition-overlay ${isTransitioning ? 'active' : ''}`}></div>

      {stage === "intro" && (
        <div className="screen">
          <div className={`header ${isTransitioning ? 'hidden' : ''}`}>
            Маленькие шаги
            <button className="back" onClick={handleBack}>←</button>
          </div>

          <div className={`intro ${isTransitioning ? 'hidden' : ''}`}>
            <div className="intro-title">
              Правда, <br /> с которой всё начинается
            </div>
            <div className="intro-subtitle">
              Почему желание не превращается <br /> в движение
            </div>
            <button className="intro-action" onClick={handleIntroContinue}>
              Продолжить →
            </button>
          </div>
        </div>
      )}

      {stage === "reading" && (
        <div className="screen">
          <div className={`header ${isTransitioning ? 'hidden' : ''}`}>
            Первый шаг
            <button className="close" onClick={handleBack}>✕</button>
          </div>

          <div className="content-wrapper">
            <div className={`content ${visible ? 'visible' : ''} ${isTransitioning ? 'hidden' : ''}`}>
              <div className="chapter-title">{chapters[current].title}</div>
              <div className="chapter-subtitle">{chapters[current].subtitle}</div>
              <div className="text">{chapters[current].text}</div>

              <div
                className="next"
                onClick={handleNext}
              >
                {current < chapters.length - 1
                  ? "Дальше →"
                  : "Сделать первую попытку →"}
              </div>
              
              <div className="progress">
                {current + 1} из {chapters.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}