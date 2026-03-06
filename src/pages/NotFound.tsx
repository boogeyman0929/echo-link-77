import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import StarBackground from "@/components/StarBackground";
import { BackArrow } from "@/components/icons/SocialIcons";

const ease = [0.22, 1, 0.36, 1] as const;

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <motion.div
          className="relative overflow-hidden void-panel max-w-[560px] w-full p-8 md:p-10 text-center"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="glass-reflection" />

          <motion.p
            className="relative z-10 text-[11px] uppercase tracking-[0.28em] text-muted-foreground/55 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            not found
          </motion.p>

          <motion.h1
            className="relative z-10 text-6xl md:text-7xl font-bold leading-none mb-4 soft-display"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            <span className="gradient-text">404</span>
          </motion.h1>

          <motion.h2
            className="relative z-10 text-xl md:text-2xl font-semibold text-foreground mb-3 soft-display"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
          >
            this page drifted into the void
          </motion.h2>

          <motion.p
            className="relative z-10 text-sm md:text-base text-muted-foreground max-w-[420px] mx-auto mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease }}
          >
            nothing lives at
            <span className="text-foreground/80"> {location.pathname}</span>
          </motion.p>

          <motion.div
            className="relative z-10 flex items-center justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/[0.02] px-4 py-2.5 text-sm text-foreground transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
            >
              <BackArrow />
              <span>return home</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
