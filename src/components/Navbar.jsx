export default function Navbar({ coins = 0, activeScreen = "home", onNavigate }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "levels", label: "Levels" },
    { id: "leaderboard", label: "Leaderboard" },
    { id: "shop", label: "Shop" },
  ];

  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="flex gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`text-sm font-semibold tracking-wide transition-colors ${
              activeScreen === item.id
                ? "text-white border-b-2 border-yellow-400 pb-0.5"
                : "text-white/60 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-400/40 rounded-full px-3 py-1">
          <span className="text-yellow-400 text-sm">🪙</span>
          <span className="text-yellow-300 font-bold text-sm">{coins}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-xs">👤</div>
          <span className="text-white text-sm font-medium">Player123</span>
        </div>
      </div>
    </nav>
  );
}