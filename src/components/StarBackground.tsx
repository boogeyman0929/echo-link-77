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

type ShootingStar = {
  x: number;
  y: number;
  len: number;
  speed: number;
  life: number;
  maxLife: number;
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
    const shootingStars: ShootingStar[] = [];

    const createStars = () => {
      stars.length = 0;
      const count = Math.max(
        80,
        Math.floor((window.innerWidth * window.innerHeight) / 21000)
      );

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1 + 0.25,
          speed: Math.random() * 0.06 + 0.008,
          opacity: Math.random() * 0.2 + 0.06,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.004 + 0.0015,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.7 + canvas.width * 0.15,
        y: Math.random() * canvas.height * 0.35,
        len: Math.random() * 90 + 70,
        speed: Math.random() * 12 + 8,
        life: 0,
        maxLife: Math.random() * 22 + 18,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        s.pulse += s.pulseSpeed;
        const currentOpacity = s.opacity * (0.58 + 0.42 * Math.sin(s.pulse));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 228, 232, ${currentOpacity})`;
        ctx.fill();

        if (s.r > 0.82) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(226, 228, 232, ${currentOpacity * 0.05})`;
          ctx.fill();
        }

        s.y -= s.speed;
        if (s.y < -3) {
          s.y = canvas.height + 3;
          s.x = Math.random() * canvas.width;
        }
      }

      if (Math.random() < 0.0018 && shootingStars.length < 2) {
        spawnShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.life += 1;
        star.x += star.speed;
        star.y += star.speed * 0.45;

        const alpha = 1 - star.life / star.maxLife;
        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - star.len,
          star.y - star.len * 0.45
        );

        gradient.addColorStop(0, `rgba(255,255,255,${alpha * 0.55})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.1;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.len, star.y - star.len * 0.45);
        ctx.stroke();

        if (star.life >= star.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

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
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
    />
  );
};

export default StarBackground;
