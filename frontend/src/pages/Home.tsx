import { useState } from "react";
import AuthModal from "../components/AuthModal";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../api/api";

export default function Home() {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<"auto" | "custom">("auto");
  const [custom, setCustom] = useState("");

  const [message, setMessage] = useState("");
  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //Send Req.
      const response = api.post;
      //If not logged in first login/signup pop up
      //If already exists or error setMsg to it
    } catch (error) {}
  };

  return (
    <>
      {!user && <AuthModal />}
      <LogoutButton />
      <main>
        <h1>Shorten your link</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Original Url..."
          />
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "auto" | "custom")}
          >
            <option value="auto">Auto</option>
            <option value="custom">Custom</option>
          </select>
          {mode === "custom" && (
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Enter the custom url"
            />
          )}
          {message && <p>{message}</p>}
          <button className="btn" type="submit">
            Create
          </button>
        </form>
      </main>
    </>
  );
}
