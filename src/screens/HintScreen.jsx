export default function HintScreen({ level, onClose }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
      <div className="bg-gradient-to-b from-blue-100 to-white rounded-3xl p-10 max-w-xs mx-auto text-center shadow-2xl border border-white/20">
        <p className="text-gray-500 text-sm font-semibold tracking-widest mb-4">— Here's a hint! —</p>
        <p className="text-blue-800 font-black text-2xl leading-snug mb-8">{level.hint}</p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-black px-10 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition-all"
        >
          GOT IT!
        </button>
      </div>
    </div>
  );
}