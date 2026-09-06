import {
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { api, setApiAccessToken } from "../api/api";
import SplashScreen from "../components/SplashScreen";
import { AuthContext, type User } from "./AuthContext";
import { registerAccessTokenSetter } from "./setReactComponents";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  registerAccessTokenSetter(setAccessToken);
  const refresh = async () => {
    try {
      console.log("Getting Refresh Data");
      const response = await api.post("/auth/refresh");
      console.log("Refresh response received:", response.data);

      console.log(`${response.data.user.name} - found and recieved`);
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      setApiAccessToken(response.data.accessToken);
      console.log(`User Loaded`);
    } catch (error) {
      setUser(null);
      setAccessToken(null);
      setApiAccessToken(null);
      console.log("Refresh Completed, User not found. Setting to NULL");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        accessToken,
        setUser,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
