import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const LoadingIntro = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[hsl(0,0%,1.2%)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="absolute inset-0 intro-vignette" />
      <div className="absolute inset-0 intro-grain" />

      <motion.div
        className="absolute h-[28rem] w-[28rem] rounded-full intro-orb"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1.08, opacity: 1 }}
        transition={{ duration: 1.4, ease }}
      />

      <div className="relative z-10 flex w-full max-w-[560px] flex-col items-center px-6 text-center">
        <motion.p
          className="mb-5 text-[10px] uppercase tracking-[0.42em] text-white/34"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease }}
        >
          loading
        </motion.p>

        <motion.h1
          className="soft-display text-4xl font-semibold tracking-tight md:text-6xl"
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.18, ease }}
        >
          <span className="gradient-text">fondl.ing</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-sm text-white/38"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease }}
        >
          entering the void
        </motion.p>

        <motion.div
          className="mt-10 h-[1px] w-full max-w-[220px] overflow-hidden rounded-full bg-white/8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.42 }}
        >
          <motion.div
            className="h-full w-full origin-left rounded-full bg-white/45"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.5, ease }}
          />
        </motion.div>

        <motion.div
          className="mt-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25 animate-pulse [animation-delay:180ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15 animate-pulse [animation-delay:360ms]" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingIntro;
