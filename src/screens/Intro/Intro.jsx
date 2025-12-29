<div className="screen splash"
     style={{
       width: "100%",
       height: "100vh",
       padding: "40px 20px",
       display: "flex",
       justifyContent: "center",
       alignItems: "flex-start",
       background: "#ffffff",
       fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
     }}>

  <div className="splash-inner"
       style={{
         width: "100%",
         maxWidth: 420,
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         textAlign: "center",
       }}>

    {/* Верхние точки */}
    <div
      style={{
        opacity: 0.45,
        fontSize: 14,
        marginBottom: 40,   // ← Увеличено
        letterSpacing: "3px",
      }}
    >
      ... ★ • • •
    </div>

    {/* Заголовок */}
    <h1
      style={{
        fontSize: 28,
        fontWeight: 600,
        lineHeight: "1.25",
        color: "#111",
        margin: 0,
        marginBottom: 18,   // ← расстояние до подзаголовка
      }}
    >
      Начать с начала — это<br />
      пространство мягких<br />
      перезапусков
    </h1>

    {/* Подзаголовок */}
    <p
      style={{
        fontSize: 17,
        color: "#5c5c5c",
        lineHeight: "1.45",
        margin: 0,
        marginBottom: 45,   // ← расстояние до картинки
        maxWidth: 350,
      }}
    >
      Ты возвращаешь себе контроль<br />
      маленькими шагами.
    </p>

    {/* Иллюстрация — шире */}
    <img
      src={IntroImage}
      alt="intro illustration"
      style={{
        width: "90%",        // ← шире
        maxWidth: 340,
        height: "auto",
        marginBottom: 50,    // ← расстояние до кнопки
        objectFit: "contain",
      }}
    />

    {/* Кнопка */}
    <button
      style={{
        width: 260,          // ← чуть шире
        height: 56,
        border: "none",
        borderRadius: 16,
        background: "#2c2c2e",
        color: "#fff",
        fontSize: 18,
        fontWeight: 500,
        cursor: "pointer",
        marginBottom: 20,    // ← расстояние до точек
      }}
    >
      Далее
    </button>

    {/* Нижние точки */}
    <div style={{ fontSize: 13, color: "#222" }}>
      ● ○ ○ ○
    </div>

  </div>
</div>
