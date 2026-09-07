import { useAuth } from "../../hooks/useAuth";
import { api, setApiAccessToken } from "../api/api";

export default function LogoutButton() {
  const { user, setUser, setAccessToken } = useAuth();

  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");
      console.log(`${user?.id} - ${user?.name}`, response.data.message);
      setUser(null);
      setAccessToken(null);
      setApiAccessToken(null);
      window.location.href = "/";
    } catch (error) {
      console.error(`${user?.id} - ${user?.name}`, error);
    }
  };

  return (
    <>
      <button className="btn btn-accent btn-dash w-2xs" onClick={logout}>
        Log Out
      </button>
    </>
  );
}
