import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StarBackground from "@/components/StarBackground";
import MusicPlayer from "@/components/MusicPlayer";
import {
  DiscordIcon,
  InstagramIcon,
  ArrowUpRight,
  BackArrow,
} from "@/components/icons/SocialIcons";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  {
    icon: <DiscordIcon />,
    label: "Discord",
    value: "@imverysuicidal",
    href: "https://discord.com/users/1411861426796232746",
  },
  {
    icon: <InstagramIcon />,
    label: "Instagram",
    value: "@sadmisanthrope",
    href: "https://www.instagram.com/shymisanthrope",
  },
];

const suicidalTrack = [
  {
    title: "Up Up",
    artist: "Elusin",
    cover: "https://files.catbox.moe/6xuixo.png",
    audio: "https://files.catbox.moe/24uy8x.mp3",
  },
];

const Suicidal = () => {
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
          className="void-panel sui-panel p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="/images/suicidal-pfp.png"
                alt="suicidal"
                className="w-20 h-20 rounded-full object-cover border border-[hsl(0,0%,78%,0.22)]"
              />
              <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500/80 border-2 border-background" />
            </div>
            <div>
              <h1 className="text-2xl font-bold soft-display">suicidal</h1>
              <p className="text-sm text-muted-foreground underline-draw inline-block pb-0.5">
                @imverysuicidal
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
            Listening
          </h3>
          <MusicPlayer tracksOverride={suicidalTrack} hideTrackList />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        >
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 px-1">
            Socials
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
                transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease }}
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

        <motion.p
          className="text-xs text-muted-foreground/30 text-center mt-16 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          fondl.ing/suicidal
        </motion.p>
      </div>
    </div>
  );
};

export default Suicidal;
