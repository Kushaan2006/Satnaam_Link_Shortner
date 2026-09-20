import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RouteProtection from "./components/RouteProtection";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <RouteProtection>
              <Dashboard />
            </RouteProtection>
          }
        />
        <Route
          path="/analytics"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route
          path="/analytics/:id"
          element={
            <RouteProtection>
              <Analytics />
            </RouteProtection>
          }
        />
      </Routes>
    </>
  );
}
