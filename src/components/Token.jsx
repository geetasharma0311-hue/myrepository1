export default function Token({ token, small = false }) {
  if (!token) return null;
  const size = small ? "w-7 h-7" : "w-10 h-10";
  const colorMap = {
  blue: "bg-blue-500 shadow-blue-400/60",
  green: "bg-green-500 shadow-green-400/60",
  red: "bg-red-500 shadow-red-400/60",
  yellow: "bg-yellow-400 shadow-yellow-300/60",
};
  if (token.shape === "circle") {
    return (
      <div className={`${size} rounded-full ${colorMap[token.color]} shadow-lg border-2 border-white/30`} />
    );
  }
  const triSize = small ? 28 : 38;
  return (
    <svg width={triSize} height={triSize} viewBox="0 0 40 40">
      <polygon
        points="20,4 38,36 2,36"
        fill={
  token.color === "blue" ? "#3b82f6" :
  token.color === "green" ? "#22c55e" :
  token.color === "red" ? "#ef4444" :
  "#facc15"
}
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
      />
    </svg>
  );
}