import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { url } = useParams();

  const [message, setMessage] = useState("Redirecting...");

  const [password, setPassword] = useState<string | null>(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [hasError, setHasError] = useState(false);

  const redirect = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/urls/${url}`,
        {
          password: password,
        },
      );

      if (response.data.passwordProtected) {
        console.log("Url is password protected");
        setShowPasswordInput(true);
        return;
      }

      console.log("Checks passed - Redirecting");
      window.location.href = response.data.url;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setMessage("Short URL not found.");
          setHasError(true);
          return;
        }

        if (error.response?.status === 400) {
          setMessage("Wrong Password!");
          setHasError(true);
          return;
        }

        if (error.response?.status === 410) {
          setMessage("This link has expired.");
          setHasError(true);
          return;
        }

        setMessage(
          error.response?.data?.message || "Could not open this link.",
        );
        setHasError(true);
        return;
      }

      setMessage("Could not open this link.");
    }
  };

  useEffect(() => {
    if (url) {
      redirect();
    }
  }, [url]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="flex flex-col items-center justify-center">
        <h1
          className={`text-xl font-semibold ${
            hasError ? "text-error!" : "text-base-content!"
          }`}
        >
          {message}
        </h1>
        <div>
          {showPasswordInput && (
            <div className="flex flex-col items-center justify-center mt-6 w-80">
              <h2 className="mb-4 text-xl font-semibold text-base-content">
                Link is Password Protected
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  redirect();
                }}
                className="flex flex-col gap-3"
              >
                <input
                  value={password || ""}
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter Password"
                  className="input input-bordered w-full rounded-xl"
                />

                <button
                  type="submit"
                  className="btn btn-primary w-full rounded-xl"
                >
                  Redirect
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
