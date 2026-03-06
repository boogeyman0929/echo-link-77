import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StarBackground from "@/components/StarBackground";
import { DiscordIcon, TelegramIcon, InstagramIcon } from "@/components/icons/SocialIcons";

const ease = [0.22, 1, 0.36, 1];

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="gradient-text">fondl.ing</span>
          </h1>
          <p className="text-sm text-muted-foreground tracking-widest uppercase">two identities · one void</p>
        </motion.div>

        {/* Duo Panels */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-[760px]">
          {/* Vale Panel */}
          <Link to="/vale" className="flex-1">
            <motion.div
              className="void-panel-hover vale-panel p-8 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="relative">
                  <img
                    src="/images/vale-pfp.jpg"
                    alt="vale"
                    className="w-20 h-20 rounded-full object-cover border border-border/50 group-hover:border-[hsl(230,60%,55%,0.3)] transition-all duration-700"
                  />
                  <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500/80 border-2 border-background" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground group-hover:glow-text-vale transition-all duration-500">vale</h2>
                  <p className="text-sm text-muted-foreground">@affording</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <DiscordIcon />
                  <span>@affording</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <TelegramIcon />
                  <span>t.me/junctural</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                <span>explore</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-500">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </Link>

          {/* Suicidal Panel */}
          <Link to="/suicidal" className="flex-1">
            <motion.div
              className="void-panel-hover sui-panel p-8 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="relative">
                  <img
                    src="/images/suicidal-pfp.png"
                    alt="suicidal"
                    className="w-20 h-20 rounded-full object-cover border border-border/50 group-hover:border-[hsl(310,50%,50%,0.3)] transition-all duration-700"
                  />
                  <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500/80 border-2 border-background" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground group-hover:glow-text-sui transition-all duration-500">suicidal</h2>
                  <p className="text-sm text-muted-foreground">@imverysuicidal</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <DiscordIcon />
                  <span>@imverysuicidal</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <InstagramIcon />
                  <span>@sadmisanthrope</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                <span>explore</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-500">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Footer */}
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
