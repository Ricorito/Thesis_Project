import { useState, useEffect, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = () => {
  const [ready, setReady] = useState(false);
  const clickCount = useRef(0);

  useEffect(() => {
    initParticlesEngine(loadSlim).then(() => setReady(true));
  }, []);

  const handleInit = (engine) => {
    engine.addInteractor("limitClicks", (container) => ({
      isEnabled: () => true,
      interact: ({ event }) => {
        if (event.type === "click" && clickCount.current < 5) {
          clickCount.current++;
          container.particles.push(5);
        }
      },
      reset: () => {},
    }));
  };

  const options = {
    background: { color: "#162747" },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "limitedPush" },
        onHover: { enable: true, mode: "repulse" },
      },
      modes: {
        limitedPush: { quantity: 5 }, 
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#f1f1f1" },
      links: {
        enable: true,
        color: "#fff",
        distance: 150,
        opacity: 0.5,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        outModes: { default: "bounce" },
      },
      number: {
        value: 120,
        density: { enable: true, area: 1080 },
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: { enable: true, speed: 1, minimumValue: 0.1 },
      },
      shape: { type: "circle" },
      size: { value: { min: 0.5, max: 1.5 }, random: true },
    },
    detectRetina: true,
  };

  return (
    ready && (
      <div className="absolute inset-0 -z-10">
        <Particles id="tsparticles" init={handleInit} options={options} />
      </div>
    )
  );
};

export default ParticlesComponent;
