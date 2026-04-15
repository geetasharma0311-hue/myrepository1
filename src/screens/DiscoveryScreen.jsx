import Token from "../components/Token";

export default function DiscoveryScreen({ level, onNext, hasNextLevel }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center relative overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute animate-ping" style={{ left: `${(i*17)%90}%`, top: `${(i*23)%85}%`, animationDelay: `${i*0.1}s`, animationDuration: "1.5s" }}>
          <span className="text-yellow-400 text-lg">✦</span>
        </div>
      ))}
      <div className="relative text-center bg-gradient-to-b from-purple-800/80 to-blue-900/80 backdrop-blur-sm rounded-3xl p-10 max-w-sm border border-white/20 shadow-2xl">
        <div className="bg-blue-600/30 rounded-2xl px-6 py-2 inline-block mb-4">
          <p className="text-white font-black text-lg tracking-wide">✦ You Found the Rule! ✦</p>
        </div>

        <div className="flex justify-center gap-1 mb-3">
          {[1,2,3].map(s => (
            <svg key={s} viewBox="0 0 24 24" className="w-6 h-6 text-yellow-400" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>

        {/* Only show THIS level's rule, not future ones */}
        <p className="text-white/50 text-xs tracking-widest uppercase mb-1">Level {level.id} Rule Revealed</p>
        <p className="text-white font-black text-2xl leading-snug mb-2">{level.rule}</p>
        <p className="text-white/50 text-sm mb-5">Level {level.id} Complete!</p>

        <div className="flex justify-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <Token token={{ shape: "circle", color: "blue" }} />
          </div>
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <Token token={{ shape: "triangle", color: "green" }} />
          </div>
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <Token token={{ shape: "circle", color: "blue" }} />
          </div>
        </div>

        <p className="text-yellow-300 font-bold text-xl mb-6">Great Job! 🎉</p>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-black px-8 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition-all w-full"
        >
          {hasNextLevel ? "Next Level ▶" : "🏆 Back to Home"}
        </button>
      </div>
    </div>
  );
}