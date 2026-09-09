import { useEffect, useState } from "react";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../api/api";
import axios from "axios";
export default function LinkShortner() {
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

      <h1 className="m-0! mb-6! text-xl! leading-snug font-semibold! tracking-tight! text-base-content!">
        Shorten your link
      </h1>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Original Url..."
          className="input w-full h-14 rounded-xl border! border-base-content/20 bg-base-100 text-base-content placeholder:text-base-content/60 focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-neutral"
        />

        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as "auto" | "custom");
            if (e.target.value === "auto") setCustom("");
          }}
          className="select w-full h-14 rounded-xl border! border-base-content/20 bg-base-100 text-base-content placeholder:text-base-content/60 focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-neutral"
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
            className="input w-full h-14 rounded-xl border! border-base-content/20 bg-base-100 text-base-content placeholder:text-base-content/60 focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-neutral"
          />
        )}

        {outputUrl && (
          <input
            readOnly
            value={outputUrl}
            onClick={() => {
              //navigate to url
            }}
            className="input w-full h-14 rounded-xl border! border-base-content/20 bg-base-100 text-base-content placeholder:text-base-content/60 focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-neutral border-primary/50 bg-base-200 font-mono text-sm select-all"
          />
        )}

        {message && (
          <p className="rounded-xl border border-error/30 bg-base-100 p-4 text-sm leading-relaxed font-medium text-error">
            {message}
          </p>
        )}

        <button
          className="btn btn-primary h-14 w-full text-neutral border! rounded-xl font-semibold shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral"
          type="submit"
        >
          Create
        </button>
      </form>
    </>
  );
}
