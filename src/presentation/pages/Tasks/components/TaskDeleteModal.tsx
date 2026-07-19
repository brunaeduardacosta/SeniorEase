import { Button } from "../../../components/ui/Button/Button";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

type TaskDeleteModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function TaskDeleteModal({ onCancel, onConfirm }: TaskDeleteModalProps) {
  const { fontSize, highContrast, extraConfirmation } = useAccessibility();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: highContrast ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: highContrast ? "#FFF" : "#FFFFFF",
          border: highContrast ? "4px solid #000" : "none",
          padding: "30px",
          borderRadius: "24px",
          maxWidth: "450px",
          width: "100%",
          boxShadow: highContrast ? "none" : "0 20px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: fontSize + 8, color: "#1E293B" }}>
          ⚠️ Excluir tarefa?
        </h2>

        <p style={{ fontSize: fontSize + 2, color: "#475569", lineHeight: 1.5, marginBottom: "25px" }}>
          {extraConfirmation
            ? "Esta ação é permanente. Revise antes de continuar. Deseja realmente excluir esta tarefa?"
            : "Você tem certeza que deseja apagar esta tarefa? Esta ação não pode ser desfeita."}
        </p>

        {extraConfirmation && (
          <div
            style={{
              background: "#FEF3C7",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "25px",
              fontSize: fontSize,
              fontWeight: 700,
            }}
          >
            🔔 Confirmação extra ativada
            <br />
            A tarefa será removida definitivamente.
          </div>
        )}

        <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>

          <Button variant="danger" onClick={onConfirm}>
            Sim, Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}