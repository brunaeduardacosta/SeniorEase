import { useState } from "react";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import type { UserProfile } from "../../../contexts/user/UserContext";

type ProfileEditFormProps = {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
};

export function ProfileEditForm({ profile, onSave }: ProfileEditFormProps) {
  const { fontSize, highContrast, extraConfirmation } = useAccessibility();

  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [institution, setInstitution] = useState(profile.institution);
  const [saved, setSaved] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  function saveProfile() {
    onSave({
      name: name.trim(),
      role: role.trim(),
      institution: institution.trim(),
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  function handleSave() {
    if (!name.trim()) return;

    if (extraConfirmation) {
      setShowConfirmation(true);
      return;
    }

    saveProfile();
  }

  const inputStyle = {
    width: "100%",
    padding: "16px 20px",
    borderRadius: "16px",
    border: highContrast ? "3px solid #000" : "2px solid #CBD5E1",
    fontSize: fontSize + 2,
    background: "#F8FAFC",
    marginBottom: "18px",
    boxSizing: "border-box" as const,
  };

  return (
    <>
      <div
        style={{
          background: "#FFF",
          border: highContrast ? "3px solid #000" : "1px solid #E2E8F0",
          borderRadius: "24px",
          padding: "28px",
          marginBottom: "24px",
          boxShadow: highContrast ? "none" : "0 10px 25px rgba(0,0,0,0.04)"
        }}
      >
        <h3 style={{ fontSize: fontSize + 4, marginBottom: 20, color: highContrast ? "#000" : "#1E293B" }}>
          Editar Perfil
        </h3>

        <label>Nome</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />

        <label>Função</label>
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Ex: Estudante" style={inputStyle} />

        <label>Instituição</label>
        <input value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Ex: FIAP Inclusive" style={inputStyle} />

        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "16px",
            border: "none",
            cursor: "pointer",
            background: highContrast ? "#000" : "#2563EB",
            color: "#FFF",
            fontSize: fontSize + 2,
            fontWeight: 700
          }}
        >
          💾 Salvar alterações
        </button>

        {saved && (
          <div style={{ marginTop: 16, color: "#16A34A", fontWeight: 700, fontSize, textAlign: "center" }}>
            ✅ Perfil salvo com sucesso!
          </div>
        )}
      </div>

      {showConfirmation && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div style={{ background: "#FFF", borderRadius: "24px", padding: "30px", width: "90%", maxWidth: 420 }}>
            <h2 style={{ fontSize: fontSize + 6 }}>⚠️ Confirmar alteração</h2>
            <p style={{ fontSize }}>
              Você tem certeza que deseja salvar as alterações do seu perfil?
            </p>

            <div style={{ display: "flex", gap: 15, marginTop: 25 }}>
              <button
                onClick={() => setShowConfirmation(false)}
                style={{ flex: 1, padding: "16px", borderRadius: "16px", border: "none", cursor: "pointer" }}
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  setShowConfirmation(false);
                  saveProfile();
                }}
                style={{
                  flex: 1,
                  padding: "16px",
                  borderRadius: "16px",
                  border: "none",
                  background: "#2563EB",
                  color: "#FFF",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}