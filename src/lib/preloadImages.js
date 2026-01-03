import intro from "../assets/intro.png";
import rewardChest from "../assets/reward-chest.png";
import step1 from "../assets/step.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";

const images = [
  intro,
  rewardChest,
  step1,
  step2,
  step3,
];

export function preloadImages() {
  return Promise.all(
    images.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        })
    )
  );
}
