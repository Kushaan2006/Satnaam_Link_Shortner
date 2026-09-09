import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
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

  const totalClicks = analyticsData.reduce(
    (sum, record) => sum + record.clicks,
    0,
  );

  const loadAnalytics = async () => {
    try {
      const response = await api.get(`/urls/${id}/analytics`);
      setAnalyticsData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "Error getting result");
      } else {
        setMessage("Could not get results");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [id]);

  return (
    <>
      <h1 className="mx-auto! mt-12! mb-6! w-full max-w-5xl px-5 text-3xl! leading-tight font-bold! text-base-content! sm:px-8 sm:text-4xl!">Analytics for ID: {id}</h1>

      {message && <p className="mx-auto w-[calc(100%-2rem)] max-w-4xl rounded-xl border border-error/30 bg-base-100 p-5 text-base-content">{message}</p>}

      {!message && <h2 className="mx-auto! mb-6! text-xl! font-semibold! text-base-content!">Total Clicks: {totalClicks}</h2> && (
        <LineChart className="mx-auto my-6 max-w-[calc(100vw-2rem)] overflow-x-auto rounded-2xl border border-base-300 bg-base-100 p-3 text-base-content shadow-sm [&_.recharts-cartesian-grid_line]:stroke-base-300 [&_.recharts-cartesian-axis-tick_text]:fill-base-content [&_.recharts-line-curve]:stroke-primary [&_.recharts-line-curve]:stroke-3 [&_.recharts-line-dot]:stroke-primary" width={700} height={350} data={analyticsData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="clicks" />
        </LineChart>
      )}
    </>
  );
}
