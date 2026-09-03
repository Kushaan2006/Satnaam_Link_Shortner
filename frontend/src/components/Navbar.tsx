import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, accessToken } = useAuth();
  return (
    <nav>
      <h2>Satnaam</h2>
      <p>{user ? user.name : "Not Logged In"}</p>
      <p>{accessToken ? accessToken : "Missing Token"}</p>
    </nav>
  );
}
