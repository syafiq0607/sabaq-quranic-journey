interface ProgressRingProps {
  progress: number;
  size?: number;
  label: string;
  sublabel: string;
}

const ProgressRing = ({ progress, size = 120, label, sublabel }: ProgressRingProps) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--gold))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl text-foreground">{Math.round(progress)}%</span>
        </div>
      </div>
      <p className="font-body text-sm font-semibold text-foreground">{label}</p>
      <p className="font-body text-xs text-muted-foreground">{sublabel}</p>
    </div>
  );
};

export default ProgressRing;
