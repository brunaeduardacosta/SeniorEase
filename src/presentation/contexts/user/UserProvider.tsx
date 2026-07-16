import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";

type Props = {
  children: ReactNode;
};

export function UserProvider({ children }: Props) {
  const [name, setName] = useState(() => {
    const saved = localStorage.getItem("userName");
    return saved || "Usuário";
  });

  useEffect(() => {
    localStorage.setItem("userName", name);
  }, [name]);

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}