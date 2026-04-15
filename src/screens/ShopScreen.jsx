import { useState } from "react";
import Navbar from "../components/NavBar";

const SHOP_ITEMS = [
  { id: 1, name: "Extra Hint", description: "Get an additional hint for any level", price: 50, icon: "💡", category: "power-up" },
  { id: 2, name: "Skip Level", description: "Skip any locked level instantly", price: 150, icon: "⏭️", category: "power-up" },
  { id: 3, name: "Double Coins", description: "Earn 2x coins for next 3 levels", price: 100, icon: "🪙", category: "boost" },
  { id: 4, name: "Blue Theme", description: "Unlock a cool blue UI theme", price: 200, icon: "💙", category: "cosmetic" },
  { id: 5, name: "Dark Theme", description: "Unlock a sleek dark UI theme", price: 200, icon: "🖤", category: "cosmetic" },
  { id: 6, name: "Gold Avatar", description: "Show off a golden player avatar", price: 300, icon: "👑", category: "cosmetic" },
  { id: 7, name: "Hint Pack x5", description: "Stock up on 5 extra hints", price: 200, icon: "🎁", category: "power-up" },
  { id: 8, name: "Time Freeze", description: "Pause the clock on timed levels", price: 75, icon: "⏸️", category: "power-up" },
];

const CATEGORIES = ["all", "power-up", "boost", "cosmetic"];

export default function ShopScreen({ onNavigate, coins = 0, setCoins }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [purchased, setPurchased] = useState([]);
  const [notification, setNotification] = useState(null);

  const filtered = SHOP_ITEMS.filter(item =>
    activeCategory === "all" || item.category === activeCategory
  );

  const handleBuy = (item) => {
    if (coins < item.price) {
      setNotification({ msg: "Not enough coins! Complete more levels.", type: "error" });
    } else if (purchased.includes(item.id)) {
      setNotification({ msg: "Already purchased!", type: "error" });
    } else {
      setCoins(prev => prev - item.price);
      setPurchased(prev => [...prev, item.id]);
      setNotification({ msg: `${item.name} purchased!`, type: "success" });
    }
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute opacity-10 animate-pulse rounded-full bg-pink-400"
          style={{ left: `${(i*21)%88}%`, top: `${(i*29)%78}%`, width: `${45+(i%3)*20}px`, height: `${45+(i%3)*20}px`, animationDelay: `${i*0.5}s` }} />
      ))}

      <Navbar coins={coins} activeScreen="shop" onNavigate={onNavigate} />

      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl border transition-all
          ${notification.type === "success"
            ? "bg-green-500/90 border-green-400 text-white"
            : "bg-red-500/90 border-red-400 text-white"}`}>
          {notification.type === "success" ? "✅ " : "❌ "}{notification.msg}
        </div>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🛒</div>
          <h2 className="text-4xl font-black text-white tracking-wider mb-2">Shop</h2>
          <p className="text-white/50 text-sm">Spend your coins on power-ups and cosmetics</p>
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/40 rounded-full px-4 py-2 mt-3">
            <span className="text-yellow-400">🪙</span>
            <span className="text-yellow-300 font-black text-lg">{coins} coins available</span>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide capitalize transition-all border
                ${activeCategory === cat
                  ? "bg-purple-500 border-purple-400 text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-2 gap-4">
          {filtered.map(item => {
            const isBought = purchased.includes(item.id);
            const canAfford = coins >= item.price;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 flex flex-col gap-3 transition-all
                  ${isBought
                    ? "border-green-400/30 bg-green-900/20"
                    : canAfford
                      ? "border-white/20 bg-white/5 hover:bg-white/10 hover:border-purple-400/40"
                      : "border-white/10 bg-white/5 opacity-60"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{item.icon}</div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border capitalize
                    ${item.category === "power-up" ? "text-blue-400 border-blue-400/30 bg-blue-400/10" :
                      item.category === "boost" ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" :
                      "text-pink-400 border-pink-400/30 bg-pink-400/10"}`}>
                    {item.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-black text-base">{item.name}</h3>
                  <p className="text-white/40 text-xs mt-0.5">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">🪙</span>
                    <span className="text-yellow-300 font-black">{item.price}</span>
                  </div>
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={isBought}
                    className={`px-4 py-2 rounded-xl font-black text-xs tracking-widest transition-all
                      ${isBought
                        ? "bg-green-500/20 text-green-400 border border-green-400/30 cursor-default"
                        : canAfford
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 shadow-lg"
                          : "bg-white/5 text-white/30 border border-white/10 cursor-not-allowed"}`}
                  >
                    {isBought ? "✓ OWNED" : canAfford ? "BUY" : "💸 LOW"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}