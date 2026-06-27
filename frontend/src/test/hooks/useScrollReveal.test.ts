import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useScrollReveal } from "../../hooks/useScrollReveal";

// ─── IntersectionObserver mock ────────────────────────────────────────────────

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: ObserverCallback | null = null;
const observedElements: Element[] = [];
const disconnectMock = vi.fn();

class MockIntersectionObserver {
  constructor(cb: ObserverCallback) {
    observerCallback = cb;
  }
  observe(el: Element) {
    observedElements.push(el);
  }
  unobserve(el: Element) {
    const idx = observedElements.indexOf(el);
    if (idx !== -1) observedElements.splice(idx, 1);
  }
  disconnect() {
    disconnectMock();
    observedElements.length = 0;
  }
}

// ─── requestAnimationFrame mock ───────────────────────────────────────────────

// Execute rAF callbacks synchronously so tests don't need fake timers.
vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
  cb(0);
  return 0;
});
vi.stubGlobal("cancelAnimationFrame", vi.fn());
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("useScrollReveal", () => {
  beforeEach(() => {
    observedElements.length = 0;
    observerCallback = null;
    disconnectMock.mockClear();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("sets up the IntersectionObserver via requestAnimationFrame", () => {
    // Add a section so querySelectorAll finds something
    document.body.innerHTML = `<section id="hero">Hero</section>`;
    renderHook(() => useScrollReveal());
    expect(observedElements.length).toBeGreaterThan(0);
  });

  it("adds reveal--visible class to intersecting elements", () => {
    document.body.innerHTML = `<section id="test-section">Test</section>`;
    renderHook(() => useScrollReveal());

    const section = document.getElementById("test-section")!;
    // Simulate the IntersectionObserver firing with isIntersecting = true
    act(() => {
      observerCallback?.([
        { target: section, isIntersecting: true } as unknown as IntersectionObserverEntry,
      ]);
    });

    expect(section.classList.contains("reveal--visible")).toBe(true);
  });

  it("does NOT add reveal--visible when isIntersecting is false", () => {
    document.body.innerHTML = `<section id="off-screen">Off screen</section>`;
    renderHook(() => useScrollReveal());

    const section = document.getElementById("off-screen")!;
    act(() => {
      observerCallback?.([
        { target: section, isIntersecting: false } as unknown as IntersectionObserverEntry,
      ]);
    });

    expect(section.classList.contains("reveal--visible")).toBe(false);
  });

  it("observes all matching selector elements", () => {
    document.body.innerHTML = `
      <section id="s1">Section 1</section>
      <section id="s2">Section 2</section>
      <div class="plan-card">Card</div>
    `;
    renderHook(() => useScrollReveal());
    // Two <section>s + one .plan-card = 3 observed elements
    expect(observedElements.length).toBe(3);
  });

  it("disconnects the observer on unmount", () => {
    document.body.innerHTML = `<section>Section</section>`;
    const { unmount } = renderHook(() => useScrollReveal());
    unmount();
    expect(disconnectMock).toHaveBeenCalledOnce();
  });
});
