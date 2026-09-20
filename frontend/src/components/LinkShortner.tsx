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

  const [hasPassword, setHasPassword] = useState(false);
  const [password, setPassword] = useState<string | null>(null);

  const [isExpiring, setIsExpiring] = useState(false);
  const [expiry, setExpiry] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [pendingCreateReq, setPendingCreateReq] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && pendingCreateReq) {
      setShowModal(false);
      setPendingCreateReq(false);
      createReq();
    }
  }, [user, pendingCreateReq]);

  const createReq = async () => {
    const passCleaned = password ? password.trim() : null;
    if (hasPassword && !passCleaned) {
      setMessage("The password cannot be empty");
      return;
    }
    try {
      //Send Req.
      const expiryTime = expiry ? new Date(expiry).toISOString() : null;
      const response = await api.post("/urls/", {
        url,
        custom,
        expiry: expiryTime,
        hasPassword: hasPassword,
        password: passCleaned,
      });
      console.log("Success created URL: ", response.data);
      setOutputUrl(`${window.location.origin}/${response.data.shortUrl}`);
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

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={isExpiring}
              onChange={(e) => {
                setIsExpiring(e.target.checked);

                if (!e.target.checked) {
                  setExpiry(null);
                }
              }}
            />

            <span className="text-sm font-medium text-base-content">
              Set an expiry date
            </span>
          </label>

          {isExpiring && (
            <input
              type="datetime-local"
              value={expiry ?? ""}
              onChange={(e) => setExpiry(e.target.value)}
              className="input w-full h-14 rounded-xl border border-base-content/20 bg-base-100 text-base-content focus:border-primary focus:outline-none"
            />
          )}
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={hasPassword}
              onChange={(e) => {
                setHasPassword(e.target.checked);

                if (!e.target.checked) {
                  setPassword(null);
                }
              }}
            />

            <span className="text-sm font-medium text-base-content">
              Set Password
            </span>
          </label>

          {hasPassword && (
            <input
              type="password"
              value={password ?? ""}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set Password..."
              className="input w-full h-14 rounded-xl border border-base-content/20 bg-base-100 text-base-content focus:border-primary focus:outline-none"
            />
          )}
        </div>

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
