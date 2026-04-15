import Navbar from "../components/NavBar";
import { LEVELS } from "../data/levels";

export default function LevelsScreen({ onNavigate, onPlayLevel, unlockedLevels = [1], completedLevels = [], coins = 0 }) {
  const difficultyColor = {
    Easy: "text-green-400 bg-green-400/10 border-green-400/30",
    Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    Hard: "text-orange-400 bg-orange-400/10 border-orange-400/30",
    Expert: "text-red-400 bg-red-400/10 border-red-400/30",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="absolute opacity-10 animate-pulse rounded-full bg-purple-400"
          style={{ left: `${(i*19)%90}%`, top: `${(i*27)%80}%`, width: `${40+(i%3)*20}px`, height: `${40+(i%3)*20}px`, animationDelay: `${i*0.5}s` }} />
      ))}

      <Navbar coins={coins} activeScreen="levels" onNavigate={onNavigate} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white tracking-wider mb-2">🎮 All Levels</h2>
          <p className="text-white/50 text-sm">Complete each level to unlock the next</p>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-2xl font-black text-yellow-400">{completedLevels.length}</p>
              <p className="text-white/40 text-xs">Completed</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black text-blue-400">{LEVELS.length - completedLevels.length}</p>
              <p className="text-white/40 text-xs">Remaining</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black text-green-400">{coins}</p>
              <p className="text-white/40 text-xs">Coins Earned</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8 bg-black/30 rounded-2xl p-4 border border-white/10">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Progress</span>
            <span>{completedLevels.length}/{LEVELS.length} levels</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${(completedLevels.length / LEVELS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Level list */}
        <div className="flex flex-col gap-4">
          {LEVELS.map((level) => {
            const isLocked = !unlockedLevels.includes(level.id);
            const isCompleted = completedLevels.includes(level.id);
            const isCurrent = !isLocked && !isCompleted;

            return (
              <div
                key={level.id}
                className={`rounded-2xl border p-5 flex items-center gap-5 transition-all
                  ${isLocked ? "border-white/10 bg-white/5 opacity-50" :
                    isCompleted ? "border-green-400/30 bg-green-900/20" :
                    "border-yellow-400/30 bg-blue-900/30 hover:bg-blue-900/50"}`}
              >
                {/* Level number */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0
                  ${isLocked ? "bg-white/5 text-white/20" :
                    isCompleted ? "bg-green-500/20 text-green-400" :
                    "bg-yellow-500/20 text-yellow-400"}`}>
                  {isLocked ? "🔒" : isCompleted ? "✓" : level.id}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-black text-lg">{level.title}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${difficultyColor[level.difficulty]}`}>
                      {level.difficulty}
                    </span>
                    {isCurrent && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full border text-yellow-400 bg-yellow-400/10 border-yellow-400/30 animate-pulse">
                        CURRENT
                      </span>
                    )}
                  </div>
                  {/* Only show rule if completed */}
                  <p className="text-sm text-white/40">
                    {isCompleted ? <span className="text-green-300 italic">"{level.rule}"</span> : isLocked ? "Complete previous level to unlock" : "Solve the puzzle to reveal the rule!"}
                  </p>
                  {/* Stars */}
                  {isCompleted && (
                    <div className="flex gap-0.5 mt-1">
                      {[1,2,3].map(s => (
                        <svg key={s} viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  )}
                </div>

                {/* Coins reward */}
                <div className="text-center flex-shrink-0">
                  <div className="flex items-center gap-1 justify-center mb-2">
                    <span className="text-yellow-400">🪙</span>
                    <span className="text-yellow-300 font-bold text-sm">100</span>
                  </div>
                  {!isLocked && (
                    <button
                      onClick={() => onPlayLevel(level)}
                      disabled={isLocked}
                      className={`px-4 py-2 rounded-xl font-black text-xs tracking-widest transition-all
                        ${isCompleted
                          ? "bg-green-500/20 text-green-400 border border-green-400/30 hover:bg-green-500/30"
                          : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 shadow-lg"}`}
                    >
                      {isCompleted ? "REPLAY" : "PLAY"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}