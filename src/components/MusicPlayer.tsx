import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tracks = [
  { title: "candyboii", artist: "dcdcdc", cover: "https://cursi.ng/dcdcdc.png", audio: "https://files.catbox.moe/ue2liq.mp3" },
  { title: "Side by Side", artist: "Bladee, Thaiboy Digital", cover: "https://cursi.ng/Side%20by%20Side.png", audio: "https://files.catbox.moe/hm9g5z.mp3" },
  { title: "Dolemite", artist: "$uicideboy$, Ramirez", cover: "https://cursi.ng/Dolemite.png", audio: "https://files.catbox.moe/o4ag5n.mp3" },
  { title: "Angels", artist: "A$AP Rocky", cover: "https://cursi.ng/L.L.A.png", audio: "https://files.catbox.moe/fsb1th.mp3" },
  { title: "Snowmen", artist: "Xavier Wulf, Ecco2k, Bladee", cover: "https://cursi.ng/Snowmen.png", audio: "https://files.catbox.moe/urj57q.mp3" },
  { title: "Bleach", artist: "Bladee, Ecco2k", cover: "https://cursi.ng/Bleach.png", audio: "https://files.catbox.moe/juklyw.mp3" },
  { title: "Highway Patrol", artist: "Yung Lean, Bladee", cover: "https://cursi.ng/Highway%20Patrol.png", audio: "https://files.catbox.moe/5fuogr.mp3" },
];

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21" /></svg>
);
const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
);
const PrevIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4"/><rect x="5" y="4" width="2" height="16"/></svg>
);
const NextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20"/><rect x="17" y="4" width="2" height="16"/></svg>
);

const MusicPlayer = () => {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = tracks[current];

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const update = () => {
      if (a.duration) setProgress(a.currentTime / a.duration);
    };
    const ended = () => {
      setCurrent((c) => (c + 1) % tracks.length);
      setPlaying(true);
    };
    a.addEventListener("timeupdate", update);
    a.addEventListener("ended", ended);
    return () => { a.removeEventListener("timeupdate", update); a.removeEventListener("ended", ended); };
  }, [current]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
    if (playing) a.play().catch(() => {});
  }, [current]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause(); else a.play().catch(() => {});
    setPlaying(!playing);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * a.duration;
  };

  const switchTrack = (i: number) => {
    setCurrent(i);
    setPlaying(true);
  };

  return (
    <div className="space-y-3">
      <audio ref={audioRef} src={track.audio} preload="metadata" />
      
      <motion.div className="glass-panel p-4 flex items-center gap-4" layout>
        <AnimatePresence mode="wait">
          <motion.img
            key={track.cover}
            src={track.cover}
            alt={track.title}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate text-foreground">{track.title}</p>
          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>

          <div className="flex items-center gap-2 mt-2">
            <button onClick={() => switchTrack((current - 1 + tracks.length) % tracks.length)} className="text-muted-foreground hover:text-foreground transition-colors duration-300"><PrevIcon /></button>
            <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center text-primary transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={() => switchTrack((current + 1) % tracks.length)} className="text-muted-foreground hover:text-foreground transition-colors duration-300"><NextIcon /></button>
          </div>

          <div className="mt-2 h-1 rounded-full bg-muted cursor-pointer group" onClick={seek}>
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <input
            type="range" min="0" max="1" step="0.01" value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-14 h-1 accent-primary cursor-pointer"
          />
        </div>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {tracks.map((t, i) => (
          <motion.button
            key={i}
            onClick={() => switchTrack(i)}
            className={`flex-shrink-0 flex items-center gap-2 p-2 rounded-xl border transition-all duration-300 ${
              i === current ? "border-primary/40 bg-primary/10" : "border-border/30 bg-card/40 hover:border-primary/20"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={t.cover} alt={t.title} className="w-8 h-8 rounded-md object-cover" />
            <div className="text-left">
              <p className="text-[11px] font-medium text-foreground truncate max-w-[80px]">{t.title}</p>
              <p className="text-[10px] text-muted-foreground truncate max-w-[80px]">{t.artist}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
