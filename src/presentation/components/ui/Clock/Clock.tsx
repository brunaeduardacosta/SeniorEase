import { useEffect, useState } from "react";

export function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: 20,
        borderRadius: 18,
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        Data e hora
      </h3>

      <h2>
        {date.toLocaleTimeString("pt-BR")}
      </h2>

      <p>
        {date.toLocaleDateString("pt-BR")}
      </p>
    </div>
  );
}