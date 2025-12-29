import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./screens/Splash/Splash";
import Intro from "./screens/Intro/Intro";
import StepIntro from "./screens/Step/StepIntro";

export default function App() {

  console.log("TG:", window.Telegram?.WebApp);   // ← оставить можно

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/step-intro" element={<StepIntro />} />   {/* 🔥 новый экран */}
      </Routes>
    </BrowserRouter>
  );
}
