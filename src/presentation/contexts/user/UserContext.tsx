import { createContext } from "react";

export type UserContextType = {
  name: string;
  setName: (name: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);