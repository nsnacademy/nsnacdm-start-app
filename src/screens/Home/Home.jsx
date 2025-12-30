import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="iphone">

      {/* TOP PILL */}
      <div className="top-container">
        <div className="top-pill">
          <div className="left">
            <img src="/icons/flower.svg" className="icon" alt="lvl" />
            <span>Уровень 3</span>
          </div>

          <div className="separator"></div>

          <div className="right">
            <img src="/icons/energy.svg" className="icon" alt="energy" />
            <span>120 ОД</span>
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      <div className="content">
        <img className="empty-img" src="/images/clipboard.png" alt="empty" />

        <h2>У вас пока нет задач</h2>
        <p>Добавьте первую задачу, чтобы начать свой путь</p>

        <button className="primary-btn">Добавить задачу</button>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="nav-wrapper">
        <div className="nav-pill">
          <button className="nav-item active">
            <img src="/icons/home.svg" alt="home" />
          </button>

          <button className="nav-item">
            <img src="/icons/steps.svg" alt="steps" />
          </button>

          <button className="nav-item">
            <img src="/icons/shop.svg" alt="shop" />
          </button>

          <button className="nav-item">
            <img src="/icons/profile.svg" alt="profile" />
          </button>
        </div>
      </div>

    </div>
  );
}
