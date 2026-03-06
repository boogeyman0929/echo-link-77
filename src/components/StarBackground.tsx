import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
};

type Comet = {
  x: number;
  y: number;
  len: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  opacity: number;
};

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    const stars: Star[] = [];
    const comets: Comet[] = [];

    const createStars = () => {
      stars.length = 0;

      const count = Math.max(
        95,
        Math.floor((window.innerWidth * window.innerHeight) / 18000)
      );

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.15 + 0.28,
          speed: Math.random() * 0.07 + 0.01,
          opacity: Math.random() * 0.28 + 0.08,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.005 + 0.0015,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    const spawnComet = () => {
      const fromTop = Math.random() < 0.7;

      comets.push({
        x: fromTop
          ? Math.random() * canvas.width * 0.75
          : -120,
        y: fromTop
          ? Math.random() * canvas.height * 0.28
          : Math.random() * canvas.height * 0.35,
        len: Math.random() * 120 + 90,
        speedX: Math.random() * 7 + 8,
        speedY: Math.random() * 2.2 + 2.6,
        life: 0,
        maxLife: Math.random() * 30 + 24,
        opacity: Math.random() * 0.22 + 0.28,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    const drawStars = () => {
      for (const s of stars) {
        s.pulse += s.pulseSpeed;
        const currentOpacity = s.opacity * (0.62 + 0.38 * Math.sin(s.pulse));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 235, 240, ${currentOpacity})`;
        ctx.fill();

        if (s.r > 0.85) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 235, 240, ${currentOpacity * 0.07})`;
          ctx.fill();
        }

        s.y -= s.speed;

        if (s.y < -4) {
          s.y = canvas.height + 4;
          s.x = Math.random() * canvas.width;
        }
      }
    };

    const drawComets = () => {
      if (Math.random() < 0.0035 && comets.length < 3) {
        spawnComet();
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.life += 1;
        comet.x += comet.speedX;
        comet.y += comet.speedY;

        const fade = 1 - comet.life / comet.maxLife;
        const alpha = comet.opacity * fade;

        const tailX = comet.x - comet.len;
        const tailY = comet.y - comet.len * 0.28;

        const gradient = ctx.createLinearGradient(
          comet.x,
          comet.y,
          tailX,
          tailY
        );

        gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
        gradient.addColorStop(0.2, `rgba(255,255,255,${alpha * 0.75})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.4;
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.9})`;
        ctx.fill();

        if (
          comet.life >= comet.maxLife ||
          comet.x - comet.len > canvas.width + 40 ||
          comet.y - comet.len > canvas.height + 40
        ) {
          comets.splice(i, 1);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawStars();
      drawComets();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-95"
    />
  );
};

export default StarBackground;
