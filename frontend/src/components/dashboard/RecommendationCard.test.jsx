import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RecommendationCard from "./RecommendationCard";

describe("RecommendationCard Component", () => {
  const mockVideo = {
    id: 1,
    title: "Elden Ring Review",
    url: "https://youtube.com/watch?v=123",
    thumbnail_url: "https://img.youtube.com/vi/123/0.jpg",
    author: { name: "VaatiVidya" },
    game: { title: "Elden Ring" },
  };

  it("renders video information correctly", () => {
    render(<RecommendationCard item={mockVideo} />);

    expect(screen.getByText("Elden Ring Review")).toBeInTheDocument();
    expect(screen.getByText("VaatiVidya")).toBeInTheDocument();
    expect(screen.getByText("Elden Ring")).toBeInTheDocument();

    const image = screen.getByRole("img", {
      name: "Elden Ring Review thumbnail",
    });
    expect(image).toHaveAttribute(
      "src",
      "https://img.youtube.com/vi/123/0.jpg",
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://youtube.com/watch?v=123");
  });

  it("renders correctly when missing some data", () => {
    const incompleteVideo = { id: 2, title: "No Game" };
    render(<RecommendationCard item={incompleteVideo} />);

    expect(screen.getByText("No Game")).toBeInTheDocument();
    expect(screen.getByText("Unknown Author")).toBeInTheDocument();
    // Default image check or similar
  });

  it("renders fallback if item is missing", () => {
    const { container } = render(<RecommendationCard item={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
