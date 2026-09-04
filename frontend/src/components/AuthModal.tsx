import { useState } from "react";
import { api } from "../api/api";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AuthModal() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [visible, setVisible] = useState<true | false>(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const { setUser, setAccessToken } = useAuth();

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (mode === "signup") {
      try {
        const response = await api.post("/auth/signup", {
          name,
          email,
          password,
        });
        console.log(response.data);
        setMode("login");
        setMessage("Account Created successfully. Please login.");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.message || "Something went wrong");
        } else {
          setMessage("Something went wrong");
        }
        console.error(error);
      }
    } else {
      try {
        const response = await api.post("/auth/login", { email, password });
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        console.log(response.data);
        setVisible(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.message || "Something went wrong");
        } else {
          setMessage("Something went wrong");
        }
        console.error(error);
      }
    }
  };

  return (
    <>
      {visible && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="tabs tabs-boxed mt-4">
              <button
                type="button"
                className={`tab ${mode === "login" ? "tab-active" : ""}`}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={`tab ${mode === "signup" ? "tab-active" : ""}`}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </div>
            {message && <p className="error">{message}</p>}
            <form onSubmit={handleFormSubmit}>
              {mode === "signup" && (
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                />
              )}
              <input
                type="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />
              <input
                type="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
              <button className="btn btn-primary w-full">
                {mode === "login" ? "Login" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
