import { describe, it, expect } from "vitest";
import { WA_NUMBER, TEL, TEL_DISPLAY, EMAIL, WA_DEFAULT } from "../../components/icons";

describe("icons — exported constants", () => {
  it("WA_NUMBER is a non-empty string", () => {
    expect(typeof WA_NUMBER).toBe("string");
    expect(WA_NUMBER.length).toBeGreaterThan(0);
  });

  it("TEL is a non-empty string", () => {
    expect(typeof TEL).toBe("string");
    expect(TEL.length).toBeGreaterThan(0);
  });

  it("TEL_DISPLAY is a non-empty string", () => {
    expect(typeof TEL_DISPLAY).toBe("string");
    expect(TEL_DISPLAY.length).toBeGreaterThan(0);
  });

  it("EMAIL contains an '@' symbol", () => {
    expect(EMAIL).toContain("@");
  });

  it("WA_DEFAULT starts with 'https://wa.me/'", () => {
    expect(WA_DEFAULT.startsWith("https://wa.me/")).toBe(true);
  });

  it("WA_DEFAULT contains the WA_NUMBER", () => {
    expect(WA_DEFAULT).toContain(WA_NUMBER);
  });

  it("WA_DEFAULT includes a pre-filled text query string", () => {
    const url = new URL(WA_DEFAULT);
    expect(url.searchParams.has("text")).toBe(true);
    expect(url.searchParams.get("text")!.length).toBeGreaterThan(0);
  });
});
