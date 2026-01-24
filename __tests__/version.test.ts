import {
  compareVersions,
  isOlderVersion,
  isNewerVersion,
  isCollabVersion,
  getDisplayVersion,
  isIncludedInGachaPool,
  version,
} from "@/data/version";

describe("version", () => {
  describe("compareVersions", () => {
    it("returns negative when first version is smaller", () => {
      expect(compareVersions("1.0", "2.0")).toBeLessThan(0);
    });

    it("returns positive when first version is larger", () => {
      expect(compareVersions("2.0", "1.0")).toBeGreaterThan(0);
    });

    it("returns 0 when versions are equal", () => {
      expect(compareVersions("2.5", "2.5")).toBe(0);
    });

    it("correctly compares minor versions", () => {
      expect(compareVersions("2.1", "2.10")).toBeLessThan(0);
      expect(compareVersions("2.10", "2.1")).toBeGreaterThan(0);
    });

    it("correctly compares major versions with different minors", () => {
      expect(compareVersions("1.9", "2.0")).toBeLessThan(0);
      expect(compareVersions("2.0", "1.9")).toBeGreaterThan(0);
    });

    it("handles decimal minor versions like 2.75", () => {
      // 2.75 is parsed as 2.75, 2.8 is parsed as 2.8
      // 75 > 8, so 2.75 > 2.8 in numeric comparison
      expect(compareVersions("2.75", "2.8")).toBeGreaterThan(0);
      expect(compareVersions("2.7", "2.75")).toBeLessThan(0);
    });
  });

  describe("isOlderVersion", () => {
    it("returns true for versions older than current", () => {
      // Current version is 3.2
      expect(isOlderVersion("1.0")).toBe(true);
      expect(isOlderVersion("2.0")).toBe(true);
      expect(isOlderVersion("3.1")).toBe(true);
    });

    it("returns false for current version", () => {
      expect(isOlderVersion(version)).toBe(false);
    });

    it("returns false for newer versions", () => {
      expect(isOlderVersion("3.3")).toBe(false);
      expect(isOlderVersion("4.0")).toBe(false);
    });
  });

  describe("isNewerVersion", () => {
    it("returns true for versions newer than current", () => {
      // Current version is 3.2
      expect(isNewerVersion("3.3")).toBe(true);
      expect(isNewerVersion("4.0")).toBe(true);
    });

    it("returns false for current version", () => {
      expect(isNewerVersion(version)).toBe(false);
    });

    it("returns false for older versions", () => {
      expect(isNewerVersion("1.0")).toBe(false);
      expect(isNewerVersion("3.1")).toBe(false);
    });
  });

  describe("isCollabVersion", () => {
    it("returns true for collab version 2.75", () => {
      expect(isCollabVersion("2.75")).toBe(true);
    });

    it("returns false for regular versions", () => {
      expect(isCollabVersion("2.0")).toBe(false);
      expect(isCollabVersion("2.7")).toBe(false);
      expect(isCollabVersion("2.8")).toBe(false);
      expect(isCollabVersion("3.0")).toBe(false);
    });
  });

  describe("getDisplayVersion", () => {
    it("returns '콜라보' for version 2.75", () => {
      expect(getDisplayVersion("2.75")).toBe("콜라보");
    });

    it("returns version number for regular versions", () => {
      expect(getDisplayVersion("2.0")).toBe("2.0");
      expect(getDisplayVersion("3.2")).toBe("3.2");
      expect(getDisplayVersion("1.5")).toBe("1.5");
    });
  });

  describe("isIncludedInGachaPool", () => {
    it("returns true when immediate_standard flag is true", () => {
      expect(isIncludedInGachaPool("3.2", true)).toBe(true);
      expect(isIncludedInGachaPool("3.1", true)).toBe(true);
    });

    it("returns true for versions included in gacha pool (3 versions prior)", () => {
      // Current version is 3.2, cutoff should be around 2.8 (index 27 - 3 = 24)
      expect(isIncludedInGachaPool("1.0")).toBe(true);
      expect(isIncludedInGachaPool("2.0")).toBe(true);
      expect(isIncludedInGachaPool("2.7")).toBe(true);
    });

    it("returns false for versions too recent to be in standard pool", () => {
      // Current version is 3.2, recent versions should not be included
      expect(isIncludedInGachaPool("3.2")).toBe(false);
      expect(isIncludedInGachaPool("3.1")).toBe(false);
    });

    it("returns false for invalid versions not in list", () => {
      // Console error is expected for this case
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      expect(isIncludedInGachaPool("9.9")).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
