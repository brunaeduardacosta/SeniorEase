import type { ReactNode } from "react";

import { Sidebar } from "../components/ui/Sidebar/Sidebar";
import { Header } from "../components/ui/Header/Header";
import { LargeCursor } from "../components/ui/LargeCursor/LargeCursor";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <LargeCursor />
      <Sidebar />

      <div className="content-wrapper">
        <Header />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}