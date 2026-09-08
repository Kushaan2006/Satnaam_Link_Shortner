import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";

type UrlRecord = {
  id: number;
  url: string;
  shortUrl: string;
  dateTime: string;
  totalClicks: number;
};

export default function Dashboard() {
  const [urls, setUrls] = useState<UrlRecord[]>([]);
  const [message, setMessage] = useState("");

  const loadUrls = async () => {
    try {
      setMessage("");

      const response = await api.get("/urls");

      setUrls(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message || "Could not load your links",
        );
      } else {
        setMessage("Could not load your links");
      }
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const totalClicks = urls.reduce((sum, url) => sum + url.totalClicks, 0);

  const copyLink = async (shortUrl: string) => {
    const fullUrl = `${import.meta.env.VITE_BACKEND_URL}${shortUrl}`;

    await navigator.clipboard.writeText(fullUrl);
  };

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-base-content/60">
          Manage your links and track their performance.
        </p>
      </div>

      {message && (
        <div className="alert alert-error mb-6">
          <span>{message}</span>
        </div>
      )}

      <div className="stats stats-vertical mb-8 w-full shadow md:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Total Links</div>
          <div className="stat-value">{urls.length}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Clicks</div>
          <div className="stat-value">{totalClicks}</div>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Your Links</h2>

          {urls.length === 0 ? (
            <div className="py-10 text-center text-base-content/60">
              You haven't created any links yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Original URL</th>
                    <th>Short URL</th>
                    <th>Clicks</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {urls.map((url) => (
                    <tr key={url.id}>
                      <td className="max-w-xs">
                        <div className="truncate">{url.url}</div>
                      </td>

                      <td>
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}${url.shortUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="link link-primary"
                        >
                          {url.shortUrl}
                        </a>
                      </td>

                      <td>
                        <span className="badge badge-neutral">
                          {url.totalClicks}
                        </span>
                      </td>

                      <td>{new Date(url.dateTime).toLocaleDateString()}</td>

                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-sm"
                            onClick={() => copyLink(url.shortUrl)}
                          >
                            Copy
                          </button>

                          <Link
                            to={`/analytics/${url.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            Analytics
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
