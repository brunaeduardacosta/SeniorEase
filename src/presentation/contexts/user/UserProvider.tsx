import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { UserContext } from "./UserContext";
import type { UserProfile } from "./UserContext";


type Props = {
  children: ReactNode;
};


export function UserProvider({
  children
}: Props) {


  const [profile, setProfile] =
    useState<UserProfile>(() => {

      const saved =
        localStorage.getItem("userProfile");


      return saved
        ? JSON.parse(saved)
        : {
            name: "Usuário",
            role: "Estudante",
            institution: "SeniorEase"
          };

    });



  useEffect(() => {

    localStorage.setItem(
      "userProfile",
      JSON.stringify(profile)
    );

  }, [profile]);



  function setName(name: string) {

    setProfile((prev) => ({
      ...prev,
      name
    }));

  }



  return (
    <UserContext.Provider

      value={{

        profile,

        setProfile,

        name: profile.name,

        setName

      }}

    >

      {children}

    </UserContext.Provider>
  );

}