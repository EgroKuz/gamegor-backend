import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatsCard from "./StatsCard";

describe("StatsCard Component", () => {
  it("renders the title and value correctly", () => {
    render(<StatsCard title="Games Played" value={15} />);

    expect(screen.getByText("Games Played")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renders with custom icon if provided", () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;
    render(<StatsCard title="Videos" value={42} icon={<CustomIcon />} />);

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("handles string values correctly", () => {
    render(<StatsCard title="Top Genre" value="RPG" />);

    expect(screen.getByText("RPG")).toBeInTheDocument();
  });
});
