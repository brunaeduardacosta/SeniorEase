type ActionCardProps = {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
};

export function ActionCard({
  icon,
  title,
  description,
  onClick,
}: ActionCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#FFFFFF",
        padding: 25,
        borderRadius: 18,
        cursor: "pointer",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
      }}
    >
      <div
        style={{
          fontSize: 40,
          marginBottom: 15,
        }}
      >
        {icon}
      </div>

      <h2
        style={{
          margin: 0,
          color: "#1E293B",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#64748B",
          marginTop: 10,
        }}
      >
        {description}
      </p>
    </div>
  );
}