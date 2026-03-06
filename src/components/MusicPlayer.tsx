import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Track = {
  title: string;
  artist: string;
  cover: string;
  audio: string;
};

const defaultTracks: Track[] = [
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
  tracksOverride?: Track[];
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

const MusicPlayer = ({
  initialTrack = 0,
  tracksOverride,
}: MusicPlayerProps) => {
  const tracks = tracksOverride && tracksOverride.length > 0 ? tracksOverride : defaultTracks;
  const safeInitialTrack =
    initialTrack >= 0 && initialTrack < tracks.length ? initialTrack : 0;

  const [current, setCurrent] = useState(safeInitialTrack);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.55);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = tracks[current];
  const canSwitchTracks = tracks.length > 1;

  useEffect(() => {
    setCurrent(safeInitialTrack);
  }, [safeInitialTrack]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const update = () => {
      if (a.duration) setProgress(a.currentTime / a.duration);
    };

    const ended = () => {
      if (tracks.length <= 1) {
        a.currentTime = 0;
        setPlaying(false);
        setProgress(0);
        return;
      }

      setCurrent((c) => (c + 1) % tracks.length);
      setPlaying(true);
    };

    a.addEventListener("timeupdate", update);
    a.addEventListener("ended", ended);

    return () => {
      a.removeEventListener("timeupdate", update);
      a.removeEventListener("ended", ended);
    };
  }, [tracks.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    a.load();
    setProgress(0);

    if (playing) {
      a.play().catch(() => {});
    }
  }, [current]);

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
    <div className="space-y-4">
      <audio ref={audioRef} src={track.audio} preload="metadata" />

      <div className="music-shell relative overflow-hidden">
        <div className="glass-reflection" />

        <div className="relative z-10 flex items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={track.cover}
              className="music-cover-wrap"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
            >
              <img
                src={track.cover}
                alt={track.title}
                className="music-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="music-badge">{playing ? "now playing" : "loaded"}</span>
            </div>

            <p className="text-lg font-semibold truncate text-foreground soft-display">
              {track.title}
            </p>
            <p className="text-sm text-muted-foreground truncate">{track.artist}</p>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() =>
                  canSwitchTracks &&
                  switchTrack((current - 1 + tracks.length) % tracks.length)
                }
                disabled={!canSwitchTracks}
                className={`transition-colors duration-300 ${
                  canSwitchTracks
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground/30 cursor-not-allowed"
                }`}
              >
                <PrevIcon />
              </button>

              <button onClick={togglePlay} className="music-play-btn">
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>

              <button
                onClick={() =>
                  canSwitchTracks && switchTrack((current + 1) % tracks.length)
                }
                disabled={!canSwitchTracks}
                className={`transition-colors duration-300 ${
                  canSwitchTracks
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground/30 cursor-not-allowed"
                }`}
              >
                <NextIcon />
              </button>
            </div>

            <div className="mt-4 music-progress" onClick={seek}>
              <motion.div
                className="music-progress-bar"
                style={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
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
              className="w-14 h-0.5 accent-muted-foreground cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
