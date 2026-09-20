import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { url } = useParams();

  const [message, setMessage] = useState("Redirecting...");

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/urls/${url}`,
        );

        window.location.href = response.data.url;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setMessage("Short URL not found.");
            return;
          }

          if (error.response?.status === 410) {
            setMessage("This link has expired.");
            return;
          }

          setMessage(
            error.response?.data?.message || "Could not open this link.",
          );
          return;
        }

        setMessage("Could not open this link.");
      }
    };

    if (url) {
      redirect();
    }
  }, [url]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-base-content">{message}</h1>
      </div>
    </main>
  );
}
