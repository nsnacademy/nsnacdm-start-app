import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./screens/Splash/Splash";
import Intro from "./screens/Intro/Intro";
import StepIntro from "./screens/Step/StepIntro";
import StepIntro2 from "./screens/Step/StepIntro2";
import StepIntro3 from "./screens/Step/StepIntro3";
import Home from "./screens/Home/Home";
import NewTask from "./screens/NewTask/NewTask";   // ← добавлено
import Steps from "./screens/Step/Steps";
import Shop from "./screens/Shop/Shop";
import FirstStep from "./screens/Shop/FirstStep";






export default function App() {

  console.log("TG:", window.Telegram?.WebApp);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/step-intro" element={<StepIntro />} />
        <Route path="/step-intro-2" element={<StepIntro2 />} />
        <Route path="/step-intro-3" element={<StepIntro3 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/steps" element={<Steps />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/first-step" element={<FirstStep />} />





        {/* 🔥 Новый роут */}
        <Route path="/new-task" element={<NewTask />} />
      </Routes>
    </BrowserRouter>
  );
}
