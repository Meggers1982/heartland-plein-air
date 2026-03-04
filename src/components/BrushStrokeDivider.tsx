const BrushStrokeDivider = ({ className = "" }: { className?: string }) => (
  <div className={`w-full overflow-hidden ${className}`}>
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className="mx-auto h-6 w-full max-w-4xl opacity-20"
    >
      <path
        d="M0 20 Q150 5 300 18 T600 22 T900 15 T1200 20"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M0 25 Q200 35 400 22 T800 28 T1200 24"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  </div>
);

export default BrushStrokeDivider;
