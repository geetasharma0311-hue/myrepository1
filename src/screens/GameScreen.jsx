import Token from "../components/Token";
import HintScreen from "./HintScreen";
import DiscoveryScreen from "./DiscoveryScreen";
import { useGameState } from "../Hooks/useGameState";
import { LEVELS } from "../data/levels";

export default function GameScreen({ level, onBack, onComplete }) {
  const { grid, hand, selected, feedback, screen, setScreen, handleTokenSelect, handleCellClick, handleSubmit } = useGameState(level);

  // Save completed level separately so Discovery always shows the RIGHT level's rule
  const completedLevel = level;
  const hasNextLevel = level.id < LEVELS.length;

  if (screen === "hint") return <HintScreen level={level} onClose={() => setScreen("game")} />;
  
  if (screen === "discovery") return (
    <DiscoveryScreen
      level={completedLevel}   // always the level just completed, never the next one
      onNext={onComplete}
      hasNextLevel={hasNextLevel}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-blue-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white/20 animate-pulse" style={{ left: `${(i*13)%97}%`, top: `${(i*17)%93}%`, width: "2px", height: "2px", animationDelay: `${i*0.3}s` }} />
      ))}

      <button onClick={onBack} className="absolute top-6 left-6 text-white/60 hover:text-white text-sm transition-colors">← Back</button>

      <div className="absolute top-6 right-6 flex gap-1.5">
        {LEVELS.map(l => (
          <div key={l.id} className={`w-2 h-2 rounded-full transition-all ${l.id === level.id ? "bg-yellow-400 scale-125" : l.id < level.id ? "bg-green-400" : "bg-white/20"}`} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-black/30 rounded-full px-4 py-1.5 mb-2 border border-white/10">
            <span className="text-white/60 text-xs font-semibold tracking-widest">{level.title.toUpperCase()} · {level.difficulty}</span>
          </div>
          <p className="text-white/70 text-sm">Place the tokens. Find the rule.</p>
        </div>

        <div
          className={`grid gap-2 mb-4 bg-black/30 rounded-2xl p-4 border ${feedback === "wrong" ? "border-red-500/60 shadow-red-500/20 shadow-lg" : "border-white/10"} transition-all`}
          style={{ gridTemplateColumns: `repeat(${level.gridSize}, 1fr)` }}
        >
          {Array(level.gridSize).fill(null).map((_, r) =>
            Array(level.gridSize).fill(null).map((_, c) => {
              const cell = grid[r][c];
              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`aspect-square rounded-xl flex items-center justify-center cursor-pointer transition-all border
                    ${cell ? "bg-white/15 border-white/30 hover:bg-white/20" : selected ? "bg-blue-500/20 border-blue-400/50 hover:bg-blue-500/30" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                >
                  {cell && <Token token={cell} />}
                </div>
              );
            })
          )}
        </div>

        <p className="text-center text-white/40 text-xs mb-4">Try placing the tokens!</p>

        <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[60px] bg-black/20 rounded-xl p-3 border border-white/10">
          {hand.length === 0 && <p className="text-white/30 text-xs self-center">All tokens placed!</p>}
          {hand.map(token => (
            <div
              key={token.id}
              onClick={() => handleTokenSelect(token)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all border
                ${selected?.id === token.id ? "bg-yellow-400/30 border-yellow-400 scale-110 shadow-lg shadow-yellow-400/30" : "bg-white/10 border-white/20 hover:bg-white/20"}`}
            >
              <Token token={token} />
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => setScreen("hint")} className="flex-1 bg-teal-600/80 hover:bg-teal-500 text-white font-black py-3 rounded-xl tracking-widest text-sm transition-all border border-teal-400/30">
            HINT
          </button>
          <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-black py-3 rounded-xl tracking-widest text-sm shadow-lg transition-all">
            SUBMIT
          </button>
        </div>

        {feedback === "wrong" && (
          <p className="text-center text-red-400 text-sm font-bold mt-3 animate-pulse">❌ Not quite right — try again!</p>
        )}
      </div>
    </div>
  );
}