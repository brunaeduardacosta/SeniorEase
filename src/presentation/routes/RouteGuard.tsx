import { Navigate } from "react-router-dom";
import { loadAppSettings } from "../../infrastructure/storage/appStorage";
import type { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

export function RouteGuard({ children }: Props) {
  const { firstAccess } = loadAppSettings();

  if (firstAccess) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}