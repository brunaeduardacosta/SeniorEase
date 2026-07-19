import { useState } from "react";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import type { TaskCategory, TaskPriority } from "../../../../domain/entities/Task";

type TaskCreationWizardProps = {
  onConfirmCreate: (title: string, category: TaskCategory, priority: TaskPriority) => void;
  showFeedback: (msg: string) => void;
};

export function TaskCreationWizard({ onConfirmCreate, showFeedback }: TaskCreationWizardProps) {
  const { fontSize, highContrast, extraConfirmation } = useAccessibility();
  const [creationStep, setCreationStep] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Pessoal");
  const [priority, setPriority] = useState<TaskPriority>("Média");

  function handleStartCreate() {
    setCreationStep(1);
    setTitle("");
    setCategory("Pessoal");
    setPriority("Média");
  }

  function handleNextStep() {
    if (!title.trim()) {
      showFeedback("Por favor, digite a tarefa primeiro.");
      return;
    }
    setCreationStep(2);
  }

  function handleConfirmCreate() {
    if (extraConfirmation) {
      setCreationStep(3);
      return;
    }

    onConfirmCreate(title, category, priority);
    setTitle("");
    setCategory("Pessoal");
    setPriority("Média");
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
  };

  const secondaryBtn = {
    padding: "16px 28px",
    fontSize: fontSize + 2,
    fontWeight: 700,
    borderRadius: "16px",
    cursor: "pointer",
    background: highContrast ? "#FFF" : "#F1F5F9",
    color: highContrast ? "#000" : "#475569",
    border: "2px solid #CBD5E1",
  };

  return (
    <div style={cardStyle}>
      {creationStep === 0 && (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <h2 style={{ fontSize: fontSize + 8, marginBottom: 20 }}>
            Adicionar nova tarefa
          </h2>
          <button style={primaryBtn} onClick={handleStartCreate}>
            + Começar nova tarefa
          </button>
        </div>
      )}

      {creationStep === 1 && (
        <div>
          <h2 style={{ fontSize: fontSize + 8 }}>
            Passo 1: O que você precisa fazer?
          </h2>
          <p style={{ fontSize }}>
            Digite o nome da sua tarefa.
          </p>
          <input
            placeholder="Ex: Entregar trabalho da faculdade"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            style={{
              width: "100%",
              padding: "20px",
              fontSize: fontSize + 4,
              borderRadius: "16px",
              border: "2px solid #CBD5E1",
              marginBottom: 30,
              boxSizing: "border-box"
            }}
          />
          <div style={{ display: "flex", gap: 16 }}>
            <button style={secondaryBtn} onClick={handleCancelCreate}>
              Cancelar
            </button>
            <button style={primaryBtn} onClick={handleNextStep}>
              Próximo ➔
            </button>
          </div>
        </div>
      )}

      {creationStep === 2 && (
        <div>
          <h2 style={{ fontSize: fontSize + 8 }}>
            Passo 2: Organize sua tarefa
          </h2>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 25 }}>
            <div>
              <label>Categoria</label>
              <br />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                style={{ padding: 14, borderRadius: 12, fontSize }}
              >
                <option value="Estudo">📚 Estudo</option>
                <option value="Trabalho">💼 Trabalho</option>
                <option value="Pessoal">🏠 Pessoal</option>
              </select>
            </div>

            <div>
              <label>Prioridade</label>
              <br />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                style={{ padding: 14, borderRadius: 12, fontSize }}
              >
                <option value="Alta">🔴 Alta</option>
                <option value="Média">🟡 Média</option>
                <option value="Baixa">🟢 Baixa</option>
              </select>
            </div>
          </div>

          <div
            style={{
              padding: 24,
              borderRadius: 16,
              background: "#EFF6FF",
              fontSize: fontSize + 4,
              fontWeight: 700,
              marginBottom: 30
            }}
          >
            "{title}"
            <br />
            Categoria: {category}
            <br />
            Prioridade: {priority}
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <button style={secondaryBtn} onClick={() => setCreationStep(1)}>
              Voltar
            </button>
            <button
              style={{ ...primaryBtn, background: "#16A34A" }}
              onClick={handleConfirmCreate}
            >
              ✓ Confirmar e Salvar
            </button>
          </div>
        </div>
      )}

      {creationStep === 3 && (
        <div>
          <h2 style={{ fontSize: fontSize + 8, color: highContrast ? "#000" : "#1E293B" }}>
            ⚠️ Confirmação final
          </h2>
          <p style={{ fontSize, marginBottom: "20px" }}>
            Você tem certeza que deseja criar esta tarefa?
          </p>
          <div
            style={{
              background: "#EFF6FF",
              padding: "20px",
              borderRadius: "16px",
              fontSize: fontSize + 3,
              fontWeight: 700,
              lineHeight: 1.8
            }}
          >
            📌 Tarefa:<br />
            {title}<br /><br />
            📂 Categoria:<br />
            {category}<br /><br />
            ⚡ Prioridade:<br />
            {priority}
          </div>
          <div style={{ display: "flex", gap: "15px", marginTop: "25px" }}>
            <button onClick={() => setCreationStep(2)} style={secondaryBtn}>
              Voltar
            </button>
            <button
              onClick={() => {
                onConfirmCreate(title, category, priority);
                setTitle("");
                setCategory("Pessoal");
                setPriority("Média");
                setCreationStep(0);
              }}
              style={primaryBtn}
            >
              ✓ Criar tarefa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}