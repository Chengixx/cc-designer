import { describe, it, expect, vi } from "vitest";
import { useTimedQuery } from "../";

describe("useTimedQuery", () => {
  it("应启动定时器并按间隔调用处理函数", async () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    const { startTimedQuery, stopTimedQuery } = useTimedQuery(handler, {
      timeout: 100,
    });

    startTimedQuery();

    vi.advanceTimersByTime(100);
    expect(handler).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(handler).toHaveBeenCalledTimes(2);

    stopTimedQuery();
    vi.advanceTimersByTime(100);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it("应在调用 stopTimedQuery 时停止定时器", () => {
    vi.useFakeTimers();
    const handler = vi.fn();
    const { startTimedQuery, stopTimedQuery } = useTimedQuery(handler, {
      timeout: 100,
    });

    startTimedQuery();
    vi.advanceTimersByTime(100);
    expect(handler).toHaveBeenCalledTimes(1);

    stopTimedQuery();
    vi.advanceTimersByTime(100);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
