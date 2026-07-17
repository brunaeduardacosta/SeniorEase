import { useEffect, useState } from "react";

export function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const timeLabel = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateLabel = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: 20,
        borderRadius: 18,
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontSize: 18, color: "#1E293B" }}>
        Data e hora
      </h3>

      <h2 style={{ margin: "0 0 8px 0", fontSize: 28, color: "#2563EB" }}>
        {timeLabel}
      </h2>

      <p style={{ margin: 0, fontSize: 15, color: "#334155", lineHeight: 1.5 }}>
        {dateLabel}
      </p>
    </div>
  );
}