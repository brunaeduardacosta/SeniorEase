import { useState } from "react";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

type TaskCreationWizardProps = {
  onConfirmCreate: (title: string) => void;
  showFeedback: (msg: string) => void;
};

export function TaskCreationWizard({ onConfirmCreate, showFeedback }: TaskCreationWizardProps) {
  const { fontSize, highContrast } = useAccessibility();
  const [creationStep, setCreationStep] = useState<number>(0);
  const [title, setTitle] = useState("");

  function handleStartCreate() {
    setCreationStep(1);
    setTitle("");
  }

  function handleNextStep() {
    if (!title.trim()) {
      showFeedback("Por favor, digite a tarefa primeiro.");
      return;
    }
    setCreationStep(2);
  }

  function handleConfirmCreate() {
    onConfirmCreate(title);
    setTitle("");
    setCreationStep(0);
  }

  function handleCancelCreate() {
    setTitle("");
    setCreationStep(0);
  }

  const cardStyle = {
    background: "#FFF",
    border: highContrast ? "3px solid #000" : "1px solid #E2E8F0",
    borderRadius: "24px",
    padding: "32px",
    marginBottom: "30px",
    boxShadow: highContrast ? "none" : "0 10px 30px rgba(0,0,0,0.06)",
  };

  const primaryBtn = {
    padding: "16px 28px",
    fontSize: fontSize + 2,
    fontWeight: 700,
    borderRadius: "16px",
    border: highContrast ? "3px solid #000" : "none",
    cursor: "pointer",
    background: highContrast ? "#000" : "#2563EB",
    color: "#FFF",
    boxShadow: highContrast ? "none" : "0 4px 12px rgba(37,99,235,0.2)",
    transition: "transform 0.2s ease",
  };

  const secondaryBtn = {
    padding: "16px 28px",
    fontSize: fontSize + 2,
    fontWeight: 700,
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    background: highContrast ? "#FFF" : "#F1F5F9",
    color: highContrast ? "#000" : "#475569",
    borderWidth: highContrast ? "3px" : "0",
    borderStyle: "solid",
    borderColor: "#000",
    transition: "transform 0.2s ease",
  };

  return (
    <div style={cardStyle}>
      {creationStep === 0 && (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <h2 style={{ fontSize: fontSize + 8, marginBottom: "20px", color: highContrast ? "#000" : "#1E293B" }}>
            Adicionar nova tarefa
          </h2>
          <button style={primaryBtn} onClick={handleStartCreate}>
            + Começar nova tarefa
          </button>
        </div>
      )}

      {creationStep === 1 && (
        <div>
          <h2 style={{ fontSize: fontSize + 8, color: highContrast ? "#000" : "#1E293B", margin: "0 0 10px 0" }}>
            Passo 1: O que você precisa fazer?
          </h2>
          <p style={{ fontSize, color: highContrast ? "#000" : "#64748B", marginBottom: "24px" }}>
            Digite o nome da sua tarefa abaixo.
          </p>
          
          <input
            placeholder="Ex: Tomar o remédio de pressão"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            style={{
              width: "100%",
              padding: "20px",
              fontSize: fontSize + 4,
              borderRadius: "16px",
              border: highContrast ? "3px solid #000" : "2px solid #CBD5E1",
              outline: "none",
              background: "#F8FAFC",
              color: "#0F172A",
              marginBottom: "30px",
              boxSizing: "border-box",
            }}
          />
          
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button style={{ ...secondaryBtn, flex: "1 1 auto" }} onClick={handleCancelCreate}>
              Cancelar
            </button>
            <button style={{ ...primaryBtn, flex: "2 1 auto" }} onClick={handleNextStep}>
              Próximo passo ➔
            </button>
          </div>
        </div>
      )}

      {creationStep === 2 && (
        <div>
          <h2 style={{ fontSize: fontSize + 8, color: highContrast ? "#000" : "#1E293B", margin: "0 0 10px 0" }}>
            Passo 2: Confirme a tarefa
          </h2>
          <p style={{ fontSize, color: highContrast ? "#000" : "#64748B", marginBottom: "24px" }}>
            A tarefa que você vai adicionar é:
          </p>
          
          <div style={{
            background: highContrast ? "#FFF" : "#EFF6FF",
            border: highContrast ? "3px solid #000" : "2px dashed #93C5FD",
            padding: "24px",
            borderRadius: "16px",
            fontSize: fontSize + 6,
            fontWeight: 800,
            color: highContrast ? "#000" : "#1E3A8A",
            marginBottom: "30px",
            textAlign: "center"
          }}>
            "{title}"
          </div>
          
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button style={{ ...secondaryBtn, flex: "1 1 auto" }} onClick={() => setCreationStep(1)}>
              🠔 Voltar e corrigir
            </button>
            <button style={{ ...primaryBtn, flex: "2 1 auto", background: highContrast ? "#000" : "#16A34A", boxShadow: highContrast ? "none" : "0 4px 12px rgba(22, 163, 74, 0.2)" }} onClick={handleConfirmCreate}>
              ✓ Confirmar e Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
