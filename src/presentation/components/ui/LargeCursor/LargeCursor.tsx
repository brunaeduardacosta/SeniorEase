import { useEffect, useRef } from "react";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";
import { useTheme } from "../../../styles/theme/useTheme";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getSafeCursorPosition(
  clientX: number,
  clientY: number,
  viewportWidth: number,
  viewportHeight: number
) {
  const isValid = Number.isFinite(clientX) && Number.isFinite(clientY);

  if (!isValid || (clientX <= 0 && clientY <= 0)) {
    return { x: viewportWidth / 2, y: viewportHeight / 2 };
  }

  return {
    x: clamp(clientX, 0, viewportWidth),
    y: clamp(clientY, 0, viewportHeight),
  };
}

export function LargeCursor() {
  const theme = useTheme();
  const { largeCursor, highContrast } = useAccessibility();
  
  // Agrupamos os elementos sob um único container pai para mover ambos de uma vez só
  const cursorRef = useRef<HTMLDivElement>(null);

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (!largeCursor || isTouchDevice) {
      document.documentElement.style.cursor = "";
      return;
    }

    const setPosition = (clientX: number, clientY: number) => {
      const nextPosition = getSafeCursorPosition(
        clientX,
        clientY,
        window.innerWidth,
        window.innerHeight
      );

      if (cursorRef.current) {
        // CORRIGIDO: Usa translate3d para acionar aceleração de hardware (GPU)
        // Isso remove o lag de processamento e zera o consumo de CPU no movimento
        cursorRef.current.style.transform = `translate3d(${nextPosition.x}px, ${nextPosition.y}px, 0)`;
      }
    };

    // Esconde o cursor padrão no documento inteiro de forma consistente
    document.documentElement.style.cursor = "none";
    
    // Centraliza o cursor customizado logo no início
    setPosition(window.innerWidth / 2, window.innerHeight / 2);

    const handleMove = (event: PointerEvent) => {
      setPosition(event.clientX, event.clientY);
    };

    const handleResize = () => {
      setPosition(window.innerWidth / 2, window.innerHeight / 2);
    };

    // Usamos pointermove global para capturar interações com precisão máxima
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", handleResize);
      document.documentElement.style.cursor = "";
    };
  }, [largeCursor, isTouchDevice]);

  if (!largeCursor || isTouchDevice) {
    return null;
  }

  const cursorColor = highContrast ? theme.colors.text : theme.colors.primary;
  const shadowColor = highContrast ? "rgba(0,0,0,0.5)" : "rgba(15,23,42,0.15)";

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        // Alinha o centro exato do container com a ponta do clique físico
        margin: "-28px 0 0 -28px", 
        width: "56px",
        height: "56px",
        willChange: "transform",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* CÍRCULO DE FOCO EXTERNO (Alinhado ao tamanho de toque sênior de 56px) */}
      <div
        style={{
          position: "absolute",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: `3px solid ${cursorColor}`, // Aumentado para 3px para dar destaque WCAG AAA
          opacity: 0.85,
          boxShadow: `0 4px 12px ${shadowColor}`,
          boxSizing: "border-box",
        }}
      />

      {/* PONTO CENTRAL DE PRECISÃO */}
      <div
        style={{
          position: "absolute",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: cursorColor,
          border: `2px solid ${theme.colors.surface}`, // Borda de corte para não sumir em fundos da mesma cor
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}