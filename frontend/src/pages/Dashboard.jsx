import React from "react";
import useDashboardData from "../hooks/useDashboardData";
import StatsGrid from "../components/dashboard/StatsGrid";
import AchievementList from "../components/dashboard/AchievementList";
import RecommendationGrid from "../components/dashboard/RecommendationGrid";

const Dashboard = () => {
  const { stats, achievements, recommendations, loading, error } =
    useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-cyan-400 text-xl font-bold animate-pulse">
          Loading Dashboard Data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-red-400 text-xl font-bold bg-red-900/20 p-6 rounded-lg border border-red-500/50">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
          Your Dashboard
        </h2>
        <p className="text-gray-400">
          Track your progress, view your latest achievements, and discover new
          content.
        </p>
      </header>

      <section>
        <StatsGrid stats={stats} />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <section className="xl:col-span-1">
          <AchievementList achievements={achievements} />
        </section>

        <section className="xl:col-span-2">
          <RecommendationGrid recommendations={recommendations} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
