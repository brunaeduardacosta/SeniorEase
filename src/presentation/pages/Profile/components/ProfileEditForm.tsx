import { useState } from "react";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

type ProfileEditFormProps = {
  currentName: string;
  onSave: (newName: string) => void;
};

export function ProfileEditForm({ currentName, onSave }: ProfileEditFormProps) {
  const { fontSize, highContrast } = useAccessibility();
  const [newName, setNewName] = useState(currentName);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!newName.trim()) return;

    onSave(newName.trim());
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  return (
    <div
      style={{
        background: "#FFF",
        border: highContrast ? "3px solid #000" : "1px solid #E2E8F0",
        borderRadius: "24px",
        padding: "28px",
        marginBottom: "24px",
        boxShadow: highContrast ? "none" : "0 10px 25px rgba(0,0,0,0.04)",
      }}
    >
      <h3
        style={{
          fontSize: fontSize + 4,
          margin: "0 0 16px 0",
          color: highContrast ? "#000" : "#1E293B",
        }}
      >
        Editar Perfil
      </h3>

      <label
        style={{
          display: "block",
          fontSize,
          fontWeight: 700,
          marginBottom: 8,
          color: highContrast ? "#000" : "#475569",
        }}
      >
        Nome de Exibição
      </label>

      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        style={{
          width: "100%",
          padding: "16px 20px",
          borderRadius: "16px",
          border: highContrast ? "3px solid #000" : "2px solid #CBD5E1",
          fontSize: fontSize + 2,
          outline: "none",
          background: "#F8FAFC",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleSave}
        style={{
          padding: "16px 28px",
          fontSize: fontSize + 2,
          fontWeight: 700,
          borderRadius: "16px",
          border: "none",
          cursor: "pointer",
          background: highContrast ? "#000" : "#2563EB",
          color: "#FFF",
          width: "100%",
        }}
      >
        💾 Salvar alterações
      </button>

      {saved && (
        <div
          style={{
            marginTop: "16px",
            color: "#16A34A",
            fontWeight: 700,
            fontSize,
            textAlign: "center",
          }}
        >
          ✅ Perfil atualizado com sucesso!
        </div>
      )}
    </div>
  );
}