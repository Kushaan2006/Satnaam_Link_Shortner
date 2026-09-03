import { useState } from "react";
import AuthModal from "../components/AuthModal";

export default function Home() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<"auto" | "custom">("auto");
  const [custom, setCustom] = useState("");

  const [msg, setMsg] = useState("");
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Send Req.
    //If not logged in first login/signup pop up
    //If already exists or error setMsg to it
  };

  return (
    <>
      <AuthModal />
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
          {msg && <p>{msg}</p>}
          <button className="btn" type="submit">
            Create
          </button>
        </form>
      </main>
    </>
  );
}
