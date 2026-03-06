import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarBackground from "@/components/StarBackground";
import MusicPlayer from "@/components/MusicPlayer";
import UserPanel, { DiscordIcon, InstagramIcon, TelegramIcon } from "@/components/UserPanel";

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const tabs = ["home", "projects", "biolinks", "contact"] as const;
type Tab = typeof tabs[number];

const vale = {
  name: "vale",
  username: "affording",
  avatar: "/images/vale-pfp.png",
  socials: [
    { icon: <DiscordIcon />, label: "Discord", value: "@affording", href: "#" },
    { icon: <TelegramIcon />, label: "Telegram", value: "t.me/junctural", href: "https://t.me/junctural" },
  ],
};

const sui = {
  name: "suicidal",
  username: "imverysuicidal",
  avatar: "/images/suicidal-pfp.png",
  socials: [
    { icon: <DiscordIcon />, label: "Discord", value: "@imverysuicidal", href: "https://discord.com/users/1411861426796232746" },
    { icon: <InstagramIcon />, label: "Instagram", value: "@sadmisanthrope", href: "https://www.instagram.com/shymisanthrope" },
  ],
};

const projects = [
  { title: "pwncheck.wtf", tag: "tool", href: "#" },
  { title: "web", tag: "site", href: "https://lurki.ng/" },
];

const contactLinks = [
  { icon: <DiscordIcon />, label: "Discord", value: "@affording", href: "#" },
  { icon: <TelegramIcon />, label: "Telegram", value: "t.me/junctural", href: "https://t.me/junctural" },
  { icon: <EmailIcon />, label: "Email", value: "affording@tortur.es", href: "mailto:affording@tortur.es" },
];

const Index = () => {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarBackground />

      <div className="relative z-10 max-w-[720px] mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold gradient-text tracking-tight">fondl.ing</h1>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-xs text-muted-foreground">
            <EyeIcon />
            <span>1,247</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.nav
          className="flex gap-1 p-1 rounded-xl glass-panel mb-6 w-fit"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm rounded-lg capitalize transition-all duration-400 ${
                tab === t
                  ? "bg-primary/15 text-primary font-medium shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </motion.nav>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <UserPanel {...vale} delay={0.1} />
                <UserPanel {...sui} delay={0.2} />
              </div>
              <MusicPlayer />
            </motion.div>
          )}

          {tab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              {projects.map((p, i) => (
                <motion.a
                  key={i}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel-hover p-5 flex items-center gap-4 group"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <LinkIcon />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{p.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{p.tag}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          )}

          {tab === "biolinks" && (
            <motion.div
              key="biolinks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div className="glass-panel p-5">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">vale's links</h3>
                <div className="space-y-2">
                  {vale.socials.map((s, i) => (
                    <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-secondary/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-400 group"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">{s.icon}</span>
                      <div className="flex-1"><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-sm font-medium text-foreground">{s.value}</p></div>
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-5">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">suicidal's links</h3>
                <div className="space-y-2">
                  {sui.socials.map((s, i) => (
                    <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-secondary/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-400 group"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">{s.icon}</span>
                      <div className="flex-1"><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-sm font-medium text-foreground">{s.value}</p></div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel p-5 space-y-2"
            >
              {contactLinks.map((c, i) => (
                <motion.a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-secondary/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-400 group"
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">{c.icon}</span>
                  <div className="flex-1"><p className="text-xs text-muted-foreground">{c.label}</p><p className="text-sm font-medium text-foreground">{c.value}</p></div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
