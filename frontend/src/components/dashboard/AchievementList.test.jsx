import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AchievementList from "./AchievementList";

describe("AchievementList Component", () => {
  const mockAchievements = [
    {
      id: 1,
      achievement: { title: "Ach 1", description: "Desc 1" },
      earned_at: "2026-05-12T10:00:00Z",
    },
    {
      id: 2,
      achievement: { title: "Ach 2", description: "Desc 2" },
      earned_at: "2026-05-12T11:00:00Z",
    },
  ];

  it("renders a list of achievements", () => {
    render(<AchievementList achievements={mockAchievements} />);

    expect(screen.getByText("Recent Achievements")).toBeInTheDocument();
    expect(screen.getByText("Ach 1")).toBeInTheDocument();
    expect(screen.getByText("Ach 2")).toBeInTheDocument();
  });

  it("renders empty state message when no achievements", () => {
    render(<AchievementList achievements={[]} />);

    expect(screen.getByText("No achievements earned yet.")).toBeInTheDocument();
  });

  it("handles null achievements gracefully", () => {
    render(<AchievementList achievements={null} />);

    expect(screen.getByText("No achievements earned yet.")).toBeInTheDocument();
  });
});
