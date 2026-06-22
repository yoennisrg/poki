import { describe, expect, it } from "vitest";
import { APPS, CATEGORIES } from "../apps";
import { isLocalUrl, isValidHttpUrl } from "../../utils/security";

const GAME_CATEGORIES = CATEGORIES.filter((category) => category !== "all");

describe("APPS data integrity", () => {
  it("has at least one app", () => {
    expect(APPS.length).toBeGreaterThan(0);
  });

  it("has unique ids", () => {
    const ids = APPS.map((app) => app.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has every required field defined and non-empty", () => {
    for (const app of APPS) {
      expect(app.id, `id for ${app.title}`).toBeDefined();
      expect(app.title.trim(), "title").not.toBe("");
      expect(app.category.trim(), "category").not.toBe("");
      expect(app.icon.trim(), "icon").not.toBe("");
      expect(app.url.trim(), "url").not.toBe("");
      expect(app.description.trim(), "description").not.toBe("");
    }
  });

  it("uses a known game category", () => {
    for (const app of APPS) {
      expect(GAME_CATEGORIES, `category for ${app.title}`).toContain(app.category);
    }
  });

  it("has a rating between 0 and 5", () => {
    for (const app of APPS) {
      expect(app.rating, `rating for ${app.title}`).toBeGreaterThanOrEqual(0);
      expect(app.rating, `rating for ${app.title}`).toBeLessThanOrEqual(5);
    }
  });

  it("marks local apps and uses a safe local URL", () => {
    for (const app of APPS) {
      if (app.isLocal) {
        expect(isLocalUrl(app.url), `local URL for ${app.title}`).toBe(true);
      }
    }
  });

  it("uses a playable URL for every app", () => {
    for (const app of APPS) {
      expect(isValidHttpUrl(app.url) || isLocalUrl(app.url), `URL for ${app.title}`).toBe(true);
    }
  });
});

describe("CATEGORIES data integrity", () => {
  it("includes the 'all' filter", () => {
    expect(CATEGORIES).toContain("all");
  });

  it("does not contain duplicate categories", () => {
    expect(new Set(CATEGORIES).size).toBe(CATEGORIES.length);
  });
});
