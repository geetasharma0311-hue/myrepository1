import { useState, useEffect, useRef } from "react";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import LevelsScreen from "./screens/LevelsScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import ShopScreen from "./screens/ShopScreen";
import { LEVELS } from "./data/levels";
import FocusVideoModal from "./components/FocusVideoModal";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeLevel, setActiveLevel] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [coins, setCoins] = useState(0);
  const [showFocusVideo, setShowFocusVideo] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element with a free relaxing music URL
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Try autoplay — browsers may block it until user interaction
    const tryPlay = () => {
      audioRef.current.play()
        .then(() => {
          setMusicPlaying(true);
          setMusicStarted(true);
        })
        .catch(() => {
          // Autoplay blocked — wait for first user interaction
          setMusicPlaying(false);
        });
    };

    tryPlay();

    // On first user interaction, start music if not already playing
    const handleInteraction = () => {
      if (!musicStarted) {
        audioRef.current.play()
          .then(() => {
            setMusicPlaying(true);
            setMusicStarted(true);
          })
          .catch(() => {});
        document.removeEventListener("click", handleInteraction);
      }
    };

    document.addEventListener("click", handleInteraction);

    return () => {
      audioRef.current.pause();
      document.removeEventListener("click", handleInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play();
      setMusicPlaying(true);
      setMusicStarted(true);
    }
  };

  const handlePlayLevel = (level) => {
    if (!unlockedLevels.includes(level.id)) return;
    setActiveLevel(level);
    setScreen("game");
  };

  const handleLevelComplete = () => {
    const currentId = activeLevel.id;
    const nextLevelId = currentId + 1;
    setCompletedLevels(prev => [...new Set([...prev, currentId])]);
    setCoins(prev => prev + 100);
    if (nextLevelId <= LEVELS.length) {
      setUnlockedLevels(prev => [...new Set([...prev, nextLevelId])]);
      setActiveLevel(LEVELS[nextLevelId - 1]);
    } else {
      setScreen("home");
    }
    if (currentId % 2 === 0) {
      setShowFocusVideo(true);
    }
  };

  // Music toggle button shown on all screens
  const MusicButton = () => (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl shadow-lg hover:scale-110 transition-all hover:bg-black/60"
      title={musicPlaying ? "Pause Music" : "Play Music"}
    >
      {musicPlaying ? "🔊" : "🔇"}
    </button>
  );

  if (screen === "game" && activeLevel) {
    return (
      <>
        <GameScreen
          key={activeLevel.id}
          level={activeLevel}
          onBack={() => setScreen("home")}
          onComplete={handleLevelComplete}
        />
        <MusicButton />
        {showFocusVideo && (
          <FocusVideoModal onClose={() => setShowFocusVideo(false)} />
        )}
      </>
    );
  }
  if (screen === "levels") return (
    <>
      <LevelsScreen onNavigate={setScreen} onPlayLevel={handlePlayLevel} unlockedLevels={unlockedLevels} completedLevels={completedLevels} coins={coins} />
      <MusicButton />
    </>
  );
  if (screen === "leaderboard") return (
    <>
      <LeaderboardScreen onNavigate={setScreen} coins={coins} />
      <MusicButton />
    </>
  );
  if (screen === "shop") return (
    <>
      <ShopScreen onNavigate={setScreen} coins={coins} setCoins={setCoins} />
      <MusicButton />
    </>
  );

  return (
    <>
      <HomeScreen
        onPlayLevel={handlePlayLevel}
        onNavigate={setScreen}
        unlockedLevels={unlockedLevels}
        completedLevels={completedLevels}
        coins={coins}
      />
      <MusicButton />
    </>
  );
}