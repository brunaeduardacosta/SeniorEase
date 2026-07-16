type ProgressBarProps = {
  value: number;
};

export function ProgressBar({
  value,
}: ProgressBarProps) {
  return (
    <div
      style={{
        width: "100%",
        height: 18,
        background: "#E2E8F0",
        borderRadius: 30,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          background: "#2563EB",
          transition: "0.4s",
          borderRadius: 30,
        }}
      />
    </div>
  );
}