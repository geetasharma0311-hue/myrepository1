import Navbar from "../components/NavBar";

const MOCK_PLAYERS = [
  { rank: 1, name: "StarSlayer99", coins: 500, levels: 5, avatar: "🥇" },
  { rank: 2, name: "PuzzleMaster", coins: 400, levels: 4, avatar: "🥈" },
  { rank: 3, name: "RuleHunter", coins: 300, levels: 3, avatar: "🥉" },
  { rank: 4, name: "TokenKing", coins: 200, levels: 2, avatar: "🎮" },
  { rank: 5, name: "GridWizard", coins: 100, levels: 1, avatar: "🧙" },
  { rank: 6, name: "ShapeSeeker", coins: 100, levels: 1, avatar: "🔍" },
  { rank: 7, name: "BlueMaster", coins: 0, levels: 0, avatar: "💙" },
  { rank: 8, name: "GreenGuard", coins: 0, levels: 0, avatar: "💚" },
  { rank: 9, name: "TriForce", coins: 0, levels: 0, avatar: "🔺" },
  { rank: 10, name: "Player123", coins: 0, levels: 0, avatar: "👤", isYou: true },
];

export default function LeaderboardScreen({ onNavigate, coins = 0 }) {
  // update Player123 coins dynamically
  const players = MOCK_PLAYERS.map(p =>
    p.isYou ? { ...p, coins, levels: Math.floor(coins / 100) } : p
  ).sort((a, b) => b.coins - a.coins).map((p, i) => ({ ...p, rank: i + 1 }));

  const rankStyle = {
    1: "border-yellow-400/50 bg-yellow-400/10",
    2: "border-gray-300/30 bg-gray-300/5",
    3: "border-orange-400/40 bg-orange-400/10",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute opacity-10 animate-pulse rounded-full bg-blue-400"
          style={{ left: `${(i*23)%88}%`, top: `${(i*31)%78}%`, width: `${50+(i%3)*25}px`, height: `${50+(i%3)*25}px`, animationDelay: `${i*0.6}s` }} />
      ))}

      <Navbar coins={coins} activeScreen="leaderboard" onNavigate={onNavigate} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🏆</div>
          <h2 className="text-4xl font-black text-white tracking-wider mb-2">Leaderboard</h2>
          <p className="text-white/50 text-sm">Top Rule Revealers worldwide</p>
        </div>

        {/* Top 3 podium */}
        <div className="flex justify-center items-end gap-4 mb-8">
          {[players[1], players[0], players[2]].map((p, i) => {
            const heights = ["h-24", "h-32", "h-20"];
            const podiumPos = [2, 1, 3];
            return (
              <div key={p.rank} className="flex flex-col items-center">
                <div className="text-2xl mb-1">{p.avatar}</div>
                <p className="text-white text-xs font-bold mb-1 max-w-[70px] text-center truncate">{p.name}</p>
                <p className="text-yellow-300 text-xs font-bold mb-2">🪙 {p.coins}</p>
                <div className={`${heights[i]} w-20 rounded-t-xl flex items-center justify-center text-2xl font-black
                  ${i===1 ? "bg-gradient-to-b from-yellow-400 to-yellow-600 text-yellow-900" :
                    i===0 ? "bg-gradient-to-b from-gray-300 to-gray-500 text-gray-800" :
                    "bg-gradient-to-b from-orange-400 to-orange-600 text-orange-900"}`}>
                  {podiumPos[i]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Full list */}
        <div className="flex flex-col gap-2">
          {players.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center gap-4 rounded-2xl border p-4 transition-all
                ${player.isYou ? "border-blue-400/50 bg-blue-500/15" : rankStyle[player.rank] || "border-white/10 bg-white/5"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0
                ${player.rank === 1 ? "bg-yellow-400 text-yellow-900" :
                  player.rank === 2 ? "bg-gray-300 text-gray-800" :
                  player.rank === 3 ? "bg-orange-400 text-orange-900" :
                  "bg-white/10 text-white/60"}`}>
                {player.rank}
              </div>
              <div className="text-2xl">{player.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={`font-bold text-sm ${player.isYou ? "text-blue-300" : "text-white"}`}>
                    {player.name}
                  </p>
                  {player.isYou && (
                    <span className="text-xs bg-blue-500/30 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full font-bold">YOU</span>
                  )}
                </div>
                <p className="text-white/40 text-xs">{player.levels} levels completed</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">🪙</span>
                <span className="text-yellow-300 font-black">{player.coins}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}