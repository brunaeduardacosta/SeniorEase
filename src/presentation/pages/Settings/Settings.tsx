import { MainLayout } from "../../layouts/MainLayout";
import { Card } from "../../components/ui/Card/Card";
import { useAccessibility } from "../../contexts/accessibility/useAccessibility";

export function Settings() {
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    simplifiedMode,
    setSimplifiedMode,
  } = useAccessibility();

  return (
    <MainLayout>
      <h1>Configurações de acessibilidade</h1>
      <p style={{ color: "#64748B", marginBottom: 30 }}>
        Personalize o SeniorEase para uma experiência mais confortável.
      </p>

      <Card>
        <h2>Tamanho da fonte</h2>
        <p>Ajuste o tamanho dos textos.</p>

        <input
          type="range"
          min="14"
          max="28"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          style={{ width: "100%" }}
        />

        <strong>{fontSize}px</strong>
      </Card>

      <div style={{ height: 20 }} />

      <Card>
        <h2>Alto contraste</h2>
        <p>Aumenta a diferença entre textos e fundos.</p>

        <label
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            fontSize: 18,
          }}
        >
          <input
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
          />
          Ativar alto contraste
        </label>
      </Card>

      <div style={{ height: 20 }} />

      <Card>
        <h2>Modo simplificado</h2>
        <p>Remove informações secundárias para facilitar a navegação.</p>

        <label
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            fontSize: 18,
          }}
        >
          <input
            type="checkbox"
            checked={simplifiedMode}
            onChange={(e) => setSimplifiedMode(e.target.checked)}
          />
          Ativar modo simplificado
        </label>
      </Card>
    </MainLayout>
  );
}