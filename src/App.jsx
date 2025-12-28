import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./screens/Splash/Splash";
import Intro from "./screens/Intro/Intro";

export default function App() {

  console.log("TG:", window.Telegram?.WebApp);   // ← вот эта строка

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/intro" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
}
