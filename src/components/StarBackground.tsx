import { useEffect, useRef } from "react";

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: {
      x: number;
      y: number;
      r: number;
      speed: number;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }[] = [];

    const createStars = () => {
      stars.length = 0;
      const count = Math.max(70, Math.floor((window.innerWidth * window.innerHeight) / 22000));

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1 + 0.25,
          speed: Math.random() * 0.06 + 0.008,
          opacity: Math.random() * 0.22 + 0.08,
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

        if (s.r > 0.8) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(226, 228, 232, ${currentOpacity * 0.07})`;
          ctx.fill();
        }

        s.y -= s.speed;

        if (s.y < -3) {
          s.y = canvas.height + 3;
          s.x = Math.random() * canvas.width;
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-90" />;
};

export default StarBackground;
