import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StarBackground from "@/components/StarBackground";
import MusicPlayer from "@/components/MusicPlayer";
import {
  DiscordIcon,
  TelegramIcon,
  EmailIcon,
  ArrowUpRight,
  LinkIcon,
  BackArrow,
} from "@/components/icons/SocialIcons";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  {
    icon: <DiscordIcon />,
    label: "Discord",
    value: "@affording",
    href: "https://discord.com/users/1093044147243450460",
  },
  {
    icon: <TelegramIcon />,
    label: "Telegram",
    value: "t.me/junctural",
    href: "https://t.me/junctural",
  },
  {
    icon: <EmailIcon />,
    label: "Email",
    value: "affording@tortur.es",
    href: "mailto:affording@tortur.es",
  },
];

const projects = [
  { title: "pwncheck.wtf", tag: "tool", href: "#" },
  { title: "lurki.ng", tag: "site", href: "https://lurki.ng/" },
];

const Vale = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarBackground />

      <div className="relative z-10 max-w-[640px] mx-auto px-5 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-500 mb-10"
          >
            <BackArrow />
            <span>fondl.ing</span>
          </Link>
        </motion.div>

        <motion.div
          className="relative overflow-hidden void-panel vale-panel p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <div className="glass-reflection" />
          <div className="flex items-center gap-5 relative z-10">
            <div className="relative">
              <img
                src="/images/vale-pfp.jpg"
                alt="vale"
                className="w-20 h-20 rounded-full object-cover border border-[hsl(0,0%,78%,0.18)]"
              />
              <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500/80 border-2 border-background" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-100 soft-display">vale</h1>
              <p className="text-sm text-muted-foreground underline-draw inline-block pb-0.5">
                @affording
              </p>
              <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/55 mt-1">
                
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mb-8"
        >
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 px-1">
            Projects
          </h3>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <motion.a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden void-panel-hover vale-panel p-5 flex items-center gap-4 group"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease }}
              >
                <div className="glass-reflection" />
                <div
                  className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border border-border/40 text-muted-foreground group-hover:text-foreground transition-colors duration-500"
                  style={{ background: "hsl(0 0% 6%)" }}
                >
                  <LinkIcon />
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{p.title}</p>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {p.tag}
                  </span>
                </div>
                <span className="relative z-10 text-muted-foreground group-hover:text-foreground transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight />
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mb-8"
        >
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 px-1">
            Contact
          </h3>
          <div className="space-y-2">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease }}
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {s.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="text-sm font-medium text-foreground truncate">
                    {s.value}
                  </p>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-all duration-500">
                  <ArrowUpRight />
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease }}
        >
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 px-1">
            Listening
          </h3>
          <MusicPlayer />
        </motion.div>

        <motion.p
          className="text-xs text-muted-foreground/30 text-center mt-16 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          fondl.ing/vale
        </motion.p>
      </div>
    </div>
  );
};

export default Vale;
