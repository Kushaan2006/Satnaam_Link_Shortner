import type React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function RouteProtection({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Route Protector in Action");
  const { user } = useAuth();
  console.log("Route Protector: Retreiving User");
  if (!user) return <Navigate to="/" replace />;
  console.log("Route Protector: User is valid, Redirecting...");
  return children;
}
