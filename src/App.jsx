import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./screens/Splash/Splash";
import Intro from "./screens/Intro/Intro";
import StepIntro from "./screens/Step/StepIntro";
import StepIntro2 from "./screens/Step/StepIntro2";

export default function App() {

  console.log("TG:", window.Telegram?.WebApp);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/step-intro" element={<StepIntro />} />
        <Route path="/step-intro-2" element={<StepIntro2 />} />
      </Routes>
    </BrowserRouter>
  );
}
