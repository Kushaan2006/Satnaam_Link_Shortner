import { useState } from "react";

export default function AuthModal() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return (
    <>
      <div>
        <div>
          <button onClick={() => setMode("login")}>Login</button>
          <button onClick={() => setMode("signup")}>Sign Up</button>
        </div>
        {mode === "signup" && <input type="text" placeholder="Name" />}
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>{mode === "login" ? "Login" : "Create Account"}</button>
      </div>
    </>
  );
}
