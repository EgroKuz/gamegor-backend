import React from "react";
import StatsCard from "./StatsCard";

const StatsGrid = ({ stats }) => {
  if (!stats) return null;

  const { games_played, videos_watched, reviews_written, top_genres } = stats;
  const topGenre = top_genres && top_genres.length > 0 ? top_genres[0] : "N/A";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard title="Games Played" value={games_played ?? 0} />
      <StatsCard title="Videos Watched" value={videos_watched ?? 0} />
      <StatsCard title="Game Sessions" value={reviews_written ?? 0} />
      <StatsCard title="Top Genre" value={topGenre} />
    </div>
  );
};

export default StatsGrid;
