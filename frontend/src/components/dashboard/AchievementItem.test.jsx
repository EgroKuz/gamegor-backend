import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AchievementItem from "./AchievementItem";

describe("AchievementItem Component", () => {
  const mockAchievement = {
    id: 1,
    achievement: {
      title: "First Blood",
      description: "Play your first game",
    },
    earned_at: "2026-05-12T10:00:00Z",
  };

  it("renders achievement details correctly", () => {
    render(<AchievementItem data={mockAchievement} />);

    expect(screen.getByText("First Blood")).toBeInTheDocument();
    expect(screen.getByText("Play your first game")).toBeInTheDocument();
    // Assuming we parse the date, or just check if it renders a formatted date
    // We'll check if the text contains part of the date or a specific formatting output
  });

  it("renders fallback if data is missing", () => {
    const { container } = render(<AchievementItem data={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
