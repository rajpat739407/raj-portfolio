export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="relative">
        {/* Outer ring */}
        <div
          className="w-14 h-14 rounded-full animate-spin"
          style={{
            border: "2px solid rgba(16, 185, 129, 0.15)",
            borderTopColor: "#10b981",
          }}
        />

        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}
          />
        </div>
      </div>
    </div>
  );
}