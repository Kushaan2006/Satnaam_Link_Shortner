import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api, setApiAccessToken } from "../api/api";

export default function LogoutButton() {
  const { user, setUser, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");
      console.log(`${user?.id} - ${user?.name}`, response.data.message);
      setUser(null);
      setAccessToken(null);
      setApiAccessToken(null);
      navigate("/");
    } catch (error) {
      console.error(`${user?.id} - ${user?.name}`, error);
    }
  };

  return (
    <>
      <button
        className="btn btn-ghost m-0 h-11 w-full justify-start border-0 text-base-content hover:bg-base-200 border! rounded-xl font-semibold shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral"
        onClick={logout}
      >
        Log Out
      </button>
    </>
  );
}
