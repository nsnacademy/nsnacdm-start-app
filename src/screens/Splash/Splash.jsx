import { useEffect } from "react";
import "./Splash.css";

export default function Splash() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/intro";
    }, 4200); // 4.2 сек

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="screen splash">
      <div className="splash-inner">
        <div className="splash-title">НАЧАТЬ С НАЧАЛА</div>

        <div className="splash-sub">
          Пространство мягких перезапусков и маленьких шагов.
        </div>

        <div className="splash-line-wrap">
          <div className="splash-line"></div>
        </div>
      </div>
    </section>
  );
}
