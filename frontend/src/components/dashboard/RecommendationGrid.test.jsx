import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RecommendationGrid from "./RecommendationGrid";

describe("RecommendationGrid Component", () => {
  const mockRecs = [
    { id: 1, title: "Rec 1" },
    { id: 2, title: "Rec 2" },
  ];

  it("renders a grid of recommendations", () => {
    render(<RecommendationGrid recommendations={mockRecs} />);

    expect(screen.getByText("Recommended for You")).toBeInTheDocument();
    expect(screen.getByText("Rec 1")).toBeInTheDocument();
    expect(screen.getByText("Rec 2")).toBeInTheDocument();
  });

  it("renders empty state message when no recommendations", () => {
    render(<RecommendationGrid recommendations={[]} />);

    expect(
      screen.getByText("No recommendations available yet."),
    ).toBeInTheDocument();
  });

  it("handles null recommendations safely", () => {
    render(<RecommendationGrid recommendations={null} />);

    expect(
      screen.getByText("No recommendations available yet."),
    ).toBeInTheDocument();
  });
});
