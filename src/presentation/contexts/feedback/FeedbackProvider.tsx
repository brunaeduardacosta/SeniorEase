import { useRef, useState } from "react";
import { FeedbackContext } from "./FeedbackContext";

export function FeedbackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState("");
  const timeoutRef = useRef<number | null>(null);

  function showMessage(msg: string) {
    setMessage(msg);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  return (
    <FeedbackContext.Provider value={{ message, showMessage }}>
      {children}

      {message && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#111",
            color: "#fff",
            padding: 14,
            borderRadius: 10,
          }}
        >
          {message}
        </div>
      )}
    </FeedbackContext.Provider>
  );
}