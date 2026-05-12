import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatsGrid from "./StatsGrid";

describe("StatsGrid Component", () => {
  const mockStats = {
    games_played: 12,
    videos_watched: 45,
    reviews_written: 3,
    top_genres: ["RPG", "Action"],
  };

  it("renders all stats cards correctly based on the stats object", () => {
    render(<StatsGrid stats={mockStats} />);

    // Check titles
    expect(screen.getByText("Games Played")).toBeInTheDocument();
    expect(screen.getByText("Videos Watched")).toBeInTheDocument();
    expect(screen.getByText("Reviews Written")).toBeInTheDocument();
    expect(screen.getByText("Top Genre")).toBeInTheDocument();

    // Check values
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("RPG")).toBeInTheDocument(); // Only first genre is typically displayed as top
  });

  it("handles empty or missing top genres safely", () => {
    const statsWithoutGenres = { ...mockStats, top_genres: [] };
    render(<StatsGrid stats={statsWithoutGenres} />);

    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("renders nothing if stats is null", () => {
    const { container } = render(<StatsGrid stats={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
