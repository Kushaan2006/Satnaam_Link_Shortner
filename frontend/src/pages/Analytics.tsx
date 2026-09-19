import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type AnalyticsRecord = {
  id: number;
  urlId: number;
  clicks: number;
  date: string;
};

export default function Analytics() {
  const { id } = useParams();

  const [analyticsData, setAnalyticsData] = useState<AnalyticsRecord[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      setMessage("");

      const response = await api.get(`/urls/${id}/analytics`);

      setAnalyticsData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Could not load analytics");
      } else {
        setMessage("Could not load analytics");
      }

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [id]);

  const totalClicks = useMemo(() => {
    return analyticsData.reduce((sum, record) => sum + record.clicks, 0);
  }, [analyticsData]);

  const averageClicks = useMemo(() => {
    if (analyticsData.length === 0) return 0;

    return Math.round(totalClicks / analyticsData.length);
  }, [analyticsData, totalClicks]);

  const bestDay = useMemo(() => {
    if (analyticsData.length === 0) return null;

    return analyticsData.reduce((best, current) =>
      current.clicks > best.clicks ? current : best,
    );
  }, [analyticsData]);

  const chartData = analyticsData.map((record) => ({
    ...record,
    formattedDate: new Date(record.date).toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
    }),
  }));

  if (isLoading) {
    return (
      <main className="min-h-[calc(100svh-5rem)] bg-base-200 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100svh-5rem)] bg-base-200 px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-6xl">
        {/* PAGE HEADER */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Link Analytics
          </p>

          <h1 className="m-0! text-3xl! font-bold! tracking-tight text-base-content! sm:text-4xl!">
            Performance overview
          </h1>

          <p className="mt-3 text-base text-base-content/65">
            Analytics for link ID #{id}
          </p>
        </div>

        {/* ERROR */}
        {message && (
          <div className="alert alert-error mb-8 shadow-sm">
            <span>{message}</span>
          </div>
        )}

        {!message && (
          <>
            {/* STATS */}
            <div className="stats stats-vertical mb-8 w-full border border-base-300 bg-base-100 shadow-sm lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Clicks</div>
                <div className="stat-value text-primary">{totalClicks}</div>
                <div className="stat-desc">Across all recorded days</div>
              </div>

              <div className="stat">
                <div className="stat-title">Active Days</div>
                <div className="stat-value">{analyticsData.length}</div>
                <div className="stat-desc">Days with recorded traffic</div>
              </div>

              <div className="stat">
                <div className="stat-title">Average</div>
                <div className="stat-value">{averageClicks}</div>
                <div className="stat-desc">Clicks per active day</div>
              </div>

              <div className="stat">
                <div className="stat-title">Best Day</div>
                <div className="stat-value text-accent">
                  {bestDay?.clicks ?? 0}
                </div>

                <div className="stat-desc">
                  {bestDay
                    ? new Date(bestDay.date).toLocaleDateString("en-CA", {
                        month: "short",
                        day: "numeric",
                      })
                    : "No data yet"}
                </div>
              </div>
            </div>

            {/* CHART */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="m-0! text-xl! font-semibold! text-base-content!">
                      Click activity
                    </h2>

                    <p className="mt-1 text-sm text-base-content/60">
                      Daily traffic for this shortened link.
                    </p>
                  </div>

                  <div className="badge badge-primary badge-outline">
                    {totalClicks} total clicks
                  </div>
                </div>

                {analyticsData.length === 0 ? (
                  <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-base-300 bg-base-200">
                    <div className="mb-3 text-5xl">📊</div>

                    <h3 className="text-lg font-semibold text-base-content">
                      No analytics yet
                    </h3>

                    <p className="mt-1 max-w-md text-center text-sm text-base-content/60">
                      Once people start opening your shortened link, traffic
                      data will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="h-[360px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />

                        <XAxis
                          dataKey="formattedDate"
                          tickLine={false}
                          axisLine={false}
                        />

                        <YAxis
                          allowDecimals={false}
                          tickLine={false}
                          axisLine={false}
                        />

                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                          }}
                        />

                        <Line
                          type="monotone"
                          dataKey="clicks"
                          stroke="var(--color-primary)"
                          strokeWidth={3}
                          dot={{
                            r: 4,
                          }}
                          activeDot={{
                            r: 6,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
