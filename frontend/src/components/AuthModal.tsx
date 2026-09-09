import { useState } from "react";
import { api, setApiAccessToken } from "../api/api";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

export default function AuthModal() {
  const { user } = useAuth();
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
        setApiAccessToken(response.data.accessToken);
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
        <div className="modal modal-open bg-neutral/50 p-4 text-base-content backdrop-blur-sm">
          <div className="modal-box w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-6 shadow-2xl sm:p-8">
            <div className="tabs tabs-boxed mb-6 grid grid-cols-2 gap-1 rounded-2xl bg-base-200 p-1.5">
              <button
                type="button"
                className={`tab h-12 rounded-xl text-base-content font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral [&.tab-active]:bg-neutral [&.tab-active]:text-neutral-content [&.tab-active]:shadow-sm ${mode === "login" ? "tab-active" : ""}`}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={`tab h-12 rounded-xl text-base-content font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral [&.tab-active]:bg-neutral [&.tab-active]:text-neutral-content [&.tab-active]:shadow-sm ${mode === "signup" ? "tab-active" : ""}`}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </div>
            {message && <p className="error mb-5 rounded-xl border border-base-300 bg-base-200 p-4 text-sm leading-relaxed text-base-content">{message}</p>}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {mode === "signup" && (
                <input
                  type="text"
                  className="input input-bordered w-full h-14 rounded-xl border! border-base-content/20 bg-base-100 text-base-content placeholder:text-base-content/60 focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-neutral"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                />
              )}
              <input
                type="email"
                className="input input-bordered w-full h-14 rounded-xl border! border-base-content/20 bg-base-100 text-base-content placeholder:text-base-content/60 focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-neutral"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />
              <input
                type="password"
                className="input input-bordered w-full h-14 rounded-xl border! border-base-content/20 bg-base-100 text-base-content placeholder:text-base-content/60 focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-neutral"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
              <button className="btn btn-primary h-14 w-full text-neutral border! rounded-xl font-semibold shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral">
                {mode === "login" ? "Login" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
