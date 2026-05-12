import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useDashboardData from "./useDashboardData";
import * as dashboardApi from "../api/dashboard";

vi.mock("../api/dashboard");

describe("useDashboardData hook", () => {
  it("fetches and returns dashboard data", async () => {
    const mockStats = { games_played: 5 };
    const mockAchievements = [{ title: "Ach1" }];
    const mockRecs = [{ title: "Rec1" }];

    dashboardApi.getStats.mockResolvedValue(mockStats);
    dashboardApi.getAchievements.mockResolvedValue(mockAchievements);
    dashboardApi.getRecommendations.mockResolvedValue(mockRecs);

    const { result } = renderHook(() => useDashboardData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.stats).toEqual(mockStats);
    expect(result.current.achievements).toEqual(mockAchievements);
    expect(result.current.recommendations).toEqual(mockRecs);
    expect(result.current.error).toBe(null);
  });

  it("handles errors gracefully", async () => {
    dashboardApi.getStats.mockRejectedValue(new Error("Fetch failed"));

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to load dashboard data");
  });
});
