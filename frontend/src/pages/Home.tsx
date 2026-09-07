import { use, useEffect, useState } from "react";
import AuthModal from "../components/AuthModal";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../api/api";
import axios from "axios";
import { redirect } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState<"auto" | "custom">("auto");
  const [custom, setCustom] = useState("");
  const [outputUrl, setOutputUrl] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [pendingCreateReq, setPendingCreateReq] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && pendingCreateReq) {
      setShowModal(false);
      setPendingCreateReq(false);
      createReq();
    }
  });

  const createReq = async () => {
    try {
      //Send Req.
      const response = await api.post("/urls/", { url, custom });
      console.log("Success created URL: ", response.data);
      setOutputUrl(
        `${import.meta.env.VITE_BACKEND_URL}${response.data.shortUrl}`,
      );
    } catch (error) {
      console.error(error);
      //If already exists or error setMsg to it
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Something went wrong");
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    //If not logged in first login/signup pop up

    if (!user) {
      setShowModal(true);
      setPendingCreateReq(true);
      return;
    }

    createReq();
  };

  return (
    <>
      {showModal && <AuthModal />}
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
            onChange={(e) => {
              setMode(e.target.value as "auto" | "custom");
              if (e.target.value === "auto") setCustom("");
            }}
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
          {outputUrl && (
            <input
              readOnly
              value={outputUrl}
              onClick={() => {
                //navigate to url
              }}
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
