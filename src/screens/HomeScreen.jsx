import Navbar from "../components/NavBar";
import LevelCard from "../components/LevelCard";
import { LEVELS } from "../data/levels";

export default function HomeScreen({ onPlayLevel, onNavigate, unlockedLevels = [1], completedLevels = [], coins = 0 }) {
  const levels = LEVELS.map(level => ({
    ...level,
    locked: !unlockedLevels.includes(level.id),
  }));
  const nextPlayable = levels.find(l => !l.locked && !completedLevels.includes(l.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="absolute opacity-20 animate-pulse" style={{ left: `${(i*17+5)%95}%`, top: `${(i*23+10)%85}%`, animationDelay: `${i*0.4}s`, animationDuration: `${3+(i%3)}s` }}>
          <div className="bg-gradient-to-br from-purple-400 to-blue-400 rounded-md" style={{ width: `${30+(i%3)*15}px`, height: `${30+(i%3)*15}px`, transform: `rotate(${i*15}deg)` }} />
        </div>
      ))}

      <Navbar coins={coins} activeScreen="home" onNavigate={onNavigate} />

      <div className="relative z-10 text-center pt-12 pb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/20 border-2 border-yellow-400/50 mb-4 animate-bounce">
          <span className="text-3xl">❓</span>
        </div>
        <div className="relative inline-block">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl px-10 py-3 border border-white/20 shadow-2xl">
            <h1 className="text-4xl font-black text-white tracking-wider drop-shadow-lg">✦ Rule Revealer ✦</h1>
          </div>
        </div>
        <p className="text-white/70 mt-3 text-lg tracking-wide">Discover the Hidden Rules!</p>
        <div className="mt-4 flex justify-center gap-4 text-sm text-white/70">
  <span>🔵 Calm</span>
  <span>🟢 Growth</span>
  <span>🔴 Energy</span>
  <span>🟡 Joy</span>
</div>
        <button
          onClick={() => nextPlayable && onPlayLevel(nextPlayable)}
          className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-black text-lg px-12 py-3 rounded-full shadow-lg transition-all hover:scale-105 tracking-widest"
        >
          START GAME
        </button>
      </div>

      <div className="relative z-10 flex justify-center gap-4 px-8 pb-16 flex-wrap">
        {levels.map(level => (
          <LevelCard
            key={level.id}
            level={level}
            onPlay={() => onPlayLevel(level)}
            completed={completedLevels.includes(level.id)}
          />
        ))}
      </div>
    </div>
  );
}