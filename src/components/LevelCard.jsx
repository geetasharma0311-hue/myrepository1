import Token from "./Token";
import StarIcon from "./StarIcon";

const previewTokens = [
  { shape: "circle", color: "blue" }, { shape: "circle", color: "green" }, { shape: "triangle", color: "green" },
  { shape: "triangle", color: "blue" }, { shape: "triangle", color: "green" }, { shape: "circle", color: "blue" },
  null, null, { shape: "circle", color: "green" },
];

export default function LevelCard({ level, onPlay, completed = false }) {
  const isLocked = level.locked;

  return (
    <div className={`w-44 rounded-2xl border transition-all p-4 backdrop-blur-sm shadow-xl
      ${isLocked
        ? "border-white/10 bg-white/5 opacity-60 cursor-not-allowed"
        : completed
          ? "border-green-400/40 bg-gradient-to-b from-green-900/60 to-emerald-900/60 hover:scale-105 cursor-pointer"
          : "border-yellow-400/40 bg-gradient-to-b from-blue-800/60 to-purple-800/60 hover:scale-105 cursor-pointer"
      }`}>

      {/* Stars */}
      <div className="flex justify-center gap-0.5 mb-2">
        {[1,2,3].map(s => <StarIcon key={s} filled={completed} />)}
      </div>

      <h3 className="text-white font-bold text-center text-sm mb-3 tracking-wider">
        {level.title.toUpperCase()}
      </h3>

      {/* Mini grid — hide tokens if locked */}
      <div className="grid grid-cols-3 gap-1 mb-3 bg-black/20 rounded-lg p-2">
        {previewTokens.map((t, i) => (
          <div key={i} className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
            {t && !isLocked && <Token token={t} small />}
          </div>
        ))}
      </div>

      {/* Rule — ONLY shown if completed */}
      {completed && !isLocked && (
        <p className="text-green-300 text-xs text-center mb-2 font-semibold italic">
          "{level.rule}"
        </p>
      )}

      {/* Bottom action */}
      {isLocked ? (
        <div className="text-center">
          <div className="text-3xl mb-1">🔒</div>
          <div className="text-white/50 text-xs font-bold tracking-widest">LOCKED</div>
          <p className="text-white/30 text-xs mt-1">Complete Level {level.id - 1} first</p>
        </div>
      ) : completed ? (
        <button
          onClick={onPlay}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black text-sm py-2 rounded-lg shadow-lg transition-all tracking-widest"
        >
          ✓ REPLAY
        </button>
      ) : (
        <button
          onClick={onPlay}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-black text-sm py-2 rounded-lg shadow-lg transition-all tracking-widest"
        >
          PLAY
        </button>
      )}
    </div>
  );
}