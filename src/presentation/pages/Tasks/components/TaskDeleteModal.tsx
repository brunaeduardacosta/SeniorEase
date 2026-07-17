import { Button } from "../../../components/ui/Button/Button";

type TaskDeleteModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function TaskDeleteModal({ onCancel, onConfirm }: TaskDeleteModalProps) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#FFF", padding: 30, borderRadius: 16, maxWidth: 400, width: "90%",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ marginTop: 0 }}>Excluir tarefa?</h2>
        <p style={{ fontSize: 18, color: "#475569", marginBottom: 30 }}>
          Você tem certeza que deseja apagar esta tarefa? Esta ação não pode ser desfeita.
        </p>
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
