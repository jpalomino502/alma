import type { ReactNode } from "react";
import { NotFoundView } from "@/components/features/common";

type GuardProps = { children: ReactNode };

export const RequireAuth = ({ children }: GuardProps) => {
  const rawUser = localStorage.getItem("auth_user");
  const token = localStorage.getItem("auth_token");
  if (!rawUser || !token) return <NotFoundView />;
  try {
    const user = JSON.parse(rawUser);
    if (!user || typeof user !== "object") return <NotFoundView />;
  } catch {
    return <NotFoundView />;
  }
  return <>{children}</>;
};

export const RequireAdmin = ({ children }: GuardProps) => {
  const rawUser = localStorage.getItem("auth_user");
  const token = localStorage.getItem("auth_token");
  if (!rawUser || !token) return <NotFoundView />;
  try {
    const user = JSON.parse(rawUser);
    if (!user || typeof user !== "object" || !user.is_admin) return <NotFoundView />;
  } catch {
    return <NotFoundView />;
  }
  return <>{children}</>;
};