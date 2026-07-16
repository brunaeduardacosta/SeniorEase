import type { ReactNode } from "react";

import { Sidebar } from "../components/ui/Sidebar/Sidebar";
import { Header } from "../components/ui/Header/Header";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F1F5F9",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header userName="Bruna" />

        <main
          style={{
            flex: 1,
            padding: "35px",
            overflowY: "auto",
            background: "#F8FAFC",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}