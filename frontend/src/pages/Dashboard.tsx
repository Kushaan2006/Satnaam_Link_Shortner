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
    <main className="mx-auto w-full max-w-6xl px-4 py-10 text-base-content sm:px-8 sm:py-14">
      <div className="mb-8">
        <h1 className="m-0! mb-3! text-3xl! leading-tight font-bold! text-base-content! sm:text-4xl!">Dashboard</h1>
        <p className="text-base-content/75">
          Manage your links and track their performance.
        </p>
      </div>

      {message && (
        <div className="alert alert-error mb-6">
          <span>{message}</span>
        </div>
      )}

      <div className="stats stats-vertical mb-8 w-full overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm sm:stats-horizontal">
        <div className="stat gap-2 p-6 sm:p-8">
          <div className="stat-title text-sm font-medium text-base-content/75">Total Links</div>
          <div className="stat-value text-4xl font-semibold tracking-tight text-base-content tabular-nums">{urls.length}</div>
        </div>

        <div className="stat gap-2 p-6 sm:p-8">
          <div className="stat-title text-sm font-medium text-base-content/75">Total Clicks</div>
          <div className="stat-value text-4xl font-semibold tracking-tight text-base-content tabular-nums">{totalClicks}</div>
        </div>
      </div>

      <div className="card overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-5 p-4 sm:p-7">
          <h2 className="card-title m-0! text-xl! font-semibold! text-base-content!">Your Links</h2>

          {urls.length === 0 ? (
            <div className="rounded-xl border border-dashed border-base-300 bg-base-200/50 px-4 py-16 text-center text-base-content/75">
              You haven't created any links yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table text-sm [&_td]:py-4 [&_th]:py-4">
                <thead className="bg-base-200 text-xs uppercase tracking-wide text-base-content/75">
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
                    <tr key={url.id} className="border-base-300/60 hover:bg-base-200/60">
                      <td className="max-w-xs">
                        <div className="truncate">{url.url}</div>
                      </td>

                      <td>
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}${url.shortUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="link font-medium text-base-content decoration-primary decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral"
                        >
                          {url.shortUrl}
                        </a>
                      </td>

                      <td>
                        <span className="badge badge-neutral min-w-9 border-0 rounded-lg font-medium tabular-nums">
                          {url.totalClicks}
                        </span>
                      </td>

                      <td>{new Date(url.dateTime).toLocaleDateString()}</td>

                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            className="btn btn-sm h-10 bg-base-100 text-base-content border-base-300 border! rounded-xl font-semibold shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral"
                            onClick={() => copyLink(url.shortUrl)}
                          >
                            Copy
                          </button>

                          <Link
                            to={`/analytics/${url.id}`}
                            className="btn btn-primary btn-sm h-10 text-neutral border! rounded-xl font-semibold shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral"
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
