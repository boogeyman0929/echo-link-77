import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tracks = [
  {
    title: "candyboii",
    artist: "dcdcdc",
    cover: "https://cursi.ng/dcdcdc.png",
    audio: "https://files.catbox.moe/ue2liq.mp3",
  },
  {
    title: "Side by Side",
    artist: "Bladee, Thaiboy Digital",
    cover: "https://cursi.ng/Side%20by%20Side.png",
    audio: "https://files.catbox.moe/hm9g5z.mp3",
  },
  {
    title: "Dolemite",
    artist: "$uicideboy$, Ramirez",
    cover: "https://cursi.ng/Dolemite.png",
    audio: "https://files.catbox.moe/o4ag5n.mp3",
  },
  {
    title: "Angels",
    artist: "A$AP Rocky",
    cover: "https://cursi.ng/L.L.A.png",
    audio: "https://files.catbox.moe/fsb1th.mp3",
  },
  {
    title: "Snowmen",
    artist: "Xavier Wulf, Ecco2k, Bladee",
    cover: "https://cursi.ng/Snowmen.png",
    audio: "https://files.catbox.moe/urj57q.mp3",
  },
  {
    title: "Bleach",
    artist: "Bladee, Ecco2k",
    cover: "https://cursi.ng/Bleach.png",
    audio: "https://files.catbox.moe/juklyw.mp3",
  },
  {
    title: "Highway Patrol",
    artist: "Yung Lean, Bladee",
    cover: "https://cursi.ng/Highway%20Patrol.png",
    audio: "https://files.catbox.moe/5fuogr.mp3",
  },
  {
    title: "Up Up",
    artist: "Elusin",
    cover: "https://files.catbox.moe/6xuixo.png",
    audio: "https://files.catbox.moe/24uy8x.mp3",
  },
];

type MusicPlayerProps = {
  initialTrack?: number;
};

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const PrevIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="19 20 9 12 19 4" />
    <rect x="5" y="4" width="2" height="16" />
  </svg>
);

const NextIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 4 15 12 5 20" />
    <rect x="17" y="4" width="2" height="16" />
  </svg>
);

const MusicPlayer = ({ initialTrack = 0 }: MusicPlayerProps) => {
  const safeInitialTrack =
    initialTrack >= 0 && initialTrack < tracks.length ? initialTrack : 0;

  const [current, setCurrent] = useState(safeInitialTrack);
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

    return () => {
      a.removeEventListener("timeupdate", update);
      a.removeEventListener("ended", ended);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
    if (playing) a.play().catch(() => {});
  }, [current, playing]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;

    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
    }
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

      <div className="void-panel p-4 flex items-center gap-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={track.cover}
            src={track.cover}
            alt={track.title}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-border/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate text-foreground">
            {track.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {track.artist}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() =>
                switchTrack((current - 1 + tracks.length) % tracks.length)
              }
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <PrevIcon />
            </button>

            <button
              onClick={togglePlay}
              className="w-7 h-7 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:border-muted-foreground transition-all duration-300"
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button
              onClick={() => switchTrack((current + 1) % tracks.length)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <NextIcon />
            </button>
          </div>

          <div
            className="mt-2 h-0.5 rounded-full bg-muted cursor-pointer"
            onClick={seek}
          >
            <motion.div
              className="h-full rounded-full bg-muted-foreground/50"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-12 h-0.5 accent-muted-foreground cursor-pointer"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {tracks.map((t, i) => (
          <button
            key={i}
            onClick={() => switchTrack(i)}
            className={`flex-shrink-0 flex items-center gap-2 p-2 rounded-xl border transition-all duration-300 ${
              i === current
                ? "border-muted-foreground/30 bg-muted/30"
                : "border-border/20 bg-transparent hover:border-border/40"
            }`}
          >
            <img
              src={t.cover}
              alt={t.title}
              className="w-7 h-7 rounded-md object-cover"
            />
            <div className="text-left">
              <p className="text-[10px] font-medium text-foreground truncate max-w-[70px]">
                {t.title}
              </p>
              <p className="text-[9px] text-muted-foreground truncate max-w-[70px]">
                {t.artist}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
