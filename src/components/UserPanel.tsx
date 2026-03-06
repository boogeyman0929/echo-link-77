import { motion } from "framer-motion";

interface Social {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

interface UserPanelProps {
  name: string;
  username: string;
  avatar: string;
  socials: Social[];
  accentVar?: string;
  delay?: number;
}

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" fill="#C13584"/>
    <path d="M24 14.162c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.228.413.56.218.96.478 1.38.898.42.42.68.82.898 1.38.164.423.36 1.058.413 2.228.058 1.266.07 1.646.07 4.849s-.012 3.584-.07 4.849c-.054 1.17-.249 1.805-.413 2.228a3.72 3.72 0 0 1-.898 1.38c-.42.42-.82.68-1.38.898-.423.164-1.058.36-2.228.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.054-1.805-.249-2.228-.413a3.72 3.72 0 0 1-1.38-.898 3.72 3.72 0 0 1-.898-1.38c-.164-.423-.36-1.058-.413-2.228-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.228.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.423-.164 1.058-.36 2.228-.413 1.265-.058 1.645-.07 4.849-.07zM24 12c-3.259 0-3.668.014-4.948.072-1.277.058-2.15.261-2.913.558a5.88 5.88 0 0 0-2.126 1.384A5.88 5.88 0 0 0 12.63 16.14c-.297.763-.5 1.636-.558 2.913C12.014 20.332 12 20.741 12 24s.014 3.668.072 4.948c.058 1.277.261 2.15.558 2.913a5.88 5.88 0 0 0 1.384 2.126 5.88 5.88 0 0 0 2.126 1.384c.763.297 1.636.5 2.913.558C20.332 35.986 20.741 36 24 36s3.668-.014 4.948-.072c1.277-.058 2.15-.261 2.913-.558a5.88 5.88 0 0 0 2.126-1.384 5.88 5.88 0 0 0 1.384-2.126c.297-.763.5-1.636.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.913a5.88 5.88 0 0 0-1.384-2.126A5.88 5.88 0 0 0 31.86 12.63c-.763-.297-1.636-.5-2.913-.558C27.668 12.014 27.259 12 24 12z" fill="white"/>
    <path d="M24.006 17.843a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="white"/>
    <circle cx="30.411" cy="17.596" r="1.44" fill="white"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const UserPanel = ({ name, username, avatar, socials, delay = 0 }: UserPanelProps) => {
  return (
    <motion.div
      className="glass-panel-hover p-6 flex-1 min-w-[280px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="relative">
          <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/30" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-card" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{name}</h2>
          <a href="#" className="text-sm text-muted-foreground underline-draw inline-block pb-0.5 transition-colors duration-300 hover:text-primary">
            @{username}
          </a>
        </div>
      </div>

      <div className="space-y-2">
        {socials.map((s, i) => (
          <motion.a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-secondary/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-400 group"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-sm font-medium text-foreground truncate">{s.value}</p>
            </div>
            <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300"><ArrowIcon /></span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export { DiscordIcon, InstagramIcon, TelegramIcon };
export default UserPanel;
