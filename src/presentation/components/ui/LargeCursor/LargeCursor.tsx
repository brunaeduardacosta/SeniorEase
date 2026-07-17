import { useEffect, useRef } from "react";
import { useAccessibility } from "../../../contexts/accessibility/useAccessibility";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getSafeCursorPosition(clientX: number, clientY: number, viewportWidth: number, viewportHeight: number) {
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
  const { largeCursor, highContrast } = useAccessibility();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (!largeCursor) {
      document.body.style.cursor = "";
      return;
    }

    const setPosition = (clientX: number, clientY: number) => {
      const nextPosition = getSafeCursorPosition(clientX, clientY, window.innerWidth, window.innerHeight);

      if (dotRef.current) {
        dotRef.current.style.left = `${nextPosition.x}px`;
        dotRef.current.style.top = `${nextPosition.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${nextPosition.x}px`;
        ringRef.current.style.top = `${nextPosition.y}px`;
      }
    };

    document.body.style.cursor = "none";
    setPosition(window.innerWidth / 2, window.innerHeight / 2);

    const handleMove = (event: PointerEvent) => {
      setPosition(event.clientX, event.clientY);
    };

    const handleResize = () => {
      setPosition(window.innerWidth / 2, window.innerHeight / 2);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", handleResize);
      document.body.style.cursor = "";
    };
  }, [largeCursor]);

  if (!largeCursor || isTouchDevice) return null;

  const color = highContrast ? "#0F172A" : "#2563EB";
  const shadowColor = highContrast ? "rgba(15, 23, 42, 0.35)" : "rgba(37, 99, 235, 0.3)";

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99999,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: color,
          transform: "translate(-50%, -50%)",
          left: 0,
          top: 0,
          border: "2px solid #FFFFFF",
          boxShadow: `0 0 0 2px ${color}, 0 8px 18px ${shadowColor}`,
          transition: "left 0.08s ease, top 0.08s ease",
          willChange: "left, top",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99998,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: `2.5px solid ${color}`,
          opacity: 0.7,
          transform: "translate(-50%, -50%)",
          left: 0,
          top: 0,
          boxShadow: `0 0 10px ${shadowColor}`,
          transition: "left 0.08s ease, top 0.08s ease",
          willChange: "left, top",
        }}
      />
    </>
  );
}
