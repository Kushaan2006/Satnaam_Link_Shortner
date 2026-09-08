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
        className="btn btn-accent btn-dash rounded-box z-1 ml-0 mt-3 w-48 p-2 shadow"
        onClick={logout}
      >
        Log Out
      </button>
    </>
  );
}
