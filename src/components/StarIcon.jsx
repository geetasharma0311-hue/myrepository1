export default function StarIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-white/20"}`} fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}