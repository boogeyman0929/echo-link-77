import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import StarBackground from "@/components/StarBackground";
import {
  DiscordIcon,
  TelegramIcon,
  InstagramIcon,
} from "@/components/icons/SocialIcons";

const ease = [0.22, 1, 0.36, 1] as const;

type TiltCardProps = {
  to: string;
  panelClass: string;
  image: string;
  alt: string;
  name: string;
  handle: string;
  quote: string;
  socialAIcon: ReactNode;
  socialAText: string;
  socialBIcon: ReactNode;
  socialBText: string;
  delay: number;
};

const TiltCard = ({
  to,
  panelClass,
  image,
  alt,
  name,
  handle,
  quote,
  socialAIcon,
  socialAText,
  socialBIcon,
  socialBText,
  delay,
}: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]), {
    stiffness: 180,
    damping: 18,
  });

  const rotateY = useSpring(useTransform(x, [-60, 60], [-8, 8]), {
    stiffness: 180,
    damping: 18,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link to={to} className="flex-1 block [perspective:1200px]">
      <motion.div
        className={`relative overflow-hidden void-panel-hover ${panelClass} p-8 cursor-pointer group`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="glass-reflection" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

        <div className="relative z-10 flex items-center gap-5 mb-6">
          <div className="relative">
            <img
              src={image}
              alt={alt}
              className="w-20 h-20 rounded-full object-cover border border-border/50 group-hover:border-[hsl(0,0%,78%,0.18)] transition-all duration-700"
            />
            <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500/80 border-2 border-background" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground group-hover:text-zinc-100 transition-all duration-500 soft-display">
              {name}
            </h2>
            <p className="text-sm text-muted-foreground">{handle}</p>
            <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/55 mt-1">
              {quote}
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-2 mb-6">
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            {socialAIcon}
            <span>{socialAText}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            {socialBIcon}
            <span>{socialBText}</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-500">
          <span>explore</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="group-hover:translate-x-1 transition-transform duration-500"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
};

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-3 soft-display"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="gradient-text">fondl.ing</span>
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-[760px]">
          <TiltCard
            to="/vale"
            panelClass="vale-panel"
            image="/images/vale-pfp.jpg"
            alt="vale"
            name="vale"
            handle="@affording"
            quote=""
            socialAIcon={<DiscordIcon />}
            socialAText="@affording"
            socialBIcon={<TelegramIcon />}
            socialBText="t.me/junctural"
            delay={0.2}
          />

          <TiltCard
            to="/suicidal"
            panelClass="sui-panel"
            image="/images/suicidal-pfp.png"
            alt="suicidal"
            name="suicidal"
            handle="@imverysuicidal"
            quote="soft static"
            socialAIcon={<DiscordIcon />}
            socialAText="@imverysuicidal"
            socialBIcon={<InstagramIcon />}
            socialBText="@sadmisanthrope"
            delay={0.35}
          />
        </div>

        <motion.p
          className="text-xs text-muted-foreground/40 mt-16 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          © fondl.ing
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
