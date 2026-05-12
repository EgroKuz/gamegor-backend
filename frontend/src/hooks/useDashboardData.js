import { useState, useEffect } from "react";
import {
  getStats,
  getAchievements,
  getRecommendations,
} from "../api/dashboard";

const useDashboardData = () => {
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, achievementsData, recommendationsData] =
          await Promise.all([
            getStats(),
            getAchievements(),
            getRecommendations(),
          ]);
        setStats(statsData);
        setAchievements(achievementsData);
        setRecommendations(recommendationsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, achievements, recommendations, loading, error };
};

export default useDashboardData;
