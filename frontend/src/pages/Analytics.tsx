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
      <h1>Analytics for ID: {id}</h1>

      {message && <p>{message}</p>}

      {!message && <h2>Total Clicks: {totalClicks}</h2> && (
        <LineChart width={700} height={350} data={analyticsData}>
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
