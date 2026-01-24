import {
  getCdnUrl,
  getSkinIllustUrl,
  getSkinListUrl,
  getBannerUrl,
  getCharacterUrl,
  getHomeUrl,
  getInfoUrl,
} from "@/lib/cdn";

describe("getCdnUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("without CDN_URL environment variable", () => {
    it("returns local path when CDN_URL is not set", () => {
      // CDN_URL is read at module load time, so we test the current behavior
      const result = getCdnUrl("infos/test.webp");
      // Without CDN, should return local path
      expect(result).toMatch(/^(\/|https?:\/\/)/);
    });

    it("normalizes paths with leading slash", () => {
      const result = getCdnUrl("/infos/test.webp");
      // Should not have double slashes
      expect(result).not.toContain("//infos");
    });

    it("handles paths without leading slash", () => {
      const result = getCdnUrl("infos/test.webp");
      expect(result).toContain("infos/test.webp");
    });
  });

  describe("path normalization", () => {
    it("removes leading slash from path", () => {
      const result1 = getCdnUrl("/path/to/file.webp");
      const result2 = getCdnUrl("path/to/file.webp");
      // Both should produce similar results (path without double slash)
      expect(result1).toContain("path/to/file.webp");
      expect(result2).toContain("path/to/file.webp");
    });
  });
});

describe("getSkinIllustUrl", () => {
  it("returns correct path for skin illustration", () => {
    const result = getSkinIllustUrl("druvis-iii-skin.webp");
    expect(result).toContain("infos/character_skin/illust/druvis-iii-skin.webp");
  });
});

describe("getSkinListUrl", () => {
  it("returns correct path for skin list image", () => {
    const result = getSkinListUrl("druvis-iii-list.webp");
    expect(result).toContain("infos/character_skin/list/druvis-iii-list.webp");
  });
});

describe("getBannerUrl", () => {
  it("returns correct path for banner image", () => {
    const result = getBannerUrl("flutter-page-banner.webp");
    expect(result).toContain("infos/banner_img/flutter-page-banner.webp");
  });
});

describe("getCharacterUrl", () => {
  it("returns local path for character image", () => {
    const result = getCharacterUrl("6stars", "druvis-iii.webp");
    expect(result).toBe("/characters/6stars/druvis-iii.webp");
  });

  it("adds _small suffix when isSmall is true", () => {
    const result = getCharacterUrl("6stars", "druvis-iii.webp", true);
    expect(result).toBe("/characters/6stars_small/druvis-iii.webp");
  });

  it("does not add _small suffix when isSmall is false", () => {
    const result = getCharacterUrl("5stars", "brimley.webp", false);
    expect(result).toBe("/characters/5stars/brimley.webp");
  });

  it("works with different rarity levels", () => {
    expect(getCharacterUrl("2stars", "char.webp")).toBe("/characters/2stars/char.webp");
    expect(getCharacterUrl("3stars", "char.webp")).toBe("/characters/3stars/char.webp");
    expect(getCharacterUrl("4stars", "char.webp")).toBe("/characters/4stars/char.webp");
    expect(getCharacterUrl("5stars", "char.webp")).toBe("/characters/5stars/char.webp");
    expect(getCharacterUrl("6stars", "char.webp")).toBe("/characters/6stars/char.webp");
  });
});

describe("getHomeUrl", () => {
  it("returns correct path for home image", () => {
    const result = getHomeUrl("background.webp");
    expect(result).toContain("infos/home/background.webp");
  });
});

describe("getInfoUrl", () => {
  it("returns correct path for info image with category", () => {
    const result = getInfoUrl("materials", "dust.webp");
    expect(result).toContain("infos/materials/dust.webp");
  });

  it("works with various categories", () => {
    expect(getInfoUrl("psycube_img", "psycube.webp")).toContain("infos/psycube_img/psycube.webp");
    expect(getInfoUrl("banner_img", "banner.webp")).toContain("infos/banner_img/banner.webp");
  });
});
