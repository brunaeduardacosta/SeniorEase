type TaskFeedbackToastProps = {
  message: string | null;
};

export function TaskFeedbackToast({ message }: TaskFeedbackToastProps) {
  if (!message) return null;
  
  return (
    <div style={{
      background: "#10B981", color: "#FFFFFF", padding: "16px 24px",
      borderRadius: 8, marginBottom: 20, fontWeight: "bold", fontSize: 18,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    }}>
      ✅ {message}
    </div>
  );
}
