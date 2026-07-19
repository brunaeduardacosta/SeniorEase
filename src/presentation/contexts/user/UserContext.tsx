import { createContext } from "react";

export type UserProfile = {
  name: string;
  role: string;
  institution: string;
};


export type UserContextType = {
  profile: UserProfile;

  setProfile: (
    profile: UserProfile
  ) => void;


  // compatibilidade com Header e outros componentes
  name: string;

  setName: (
    name: string
  ) => void;
};


export const UserContext =
  createContext<UserContextType | null>(null);