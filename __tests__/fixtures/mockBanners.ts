import { Banner } from "@/data/banners";
import { EnrichedBanner } from "@/lib/gacha/gachaLogic";
import { mockCharacters } from "./mockCharacters";

/**
 * Mock banners for testing
 * Includes regular pickup and double pickup banners
 */

// Basic Banner type banners (without enriched character objects)
export const mockBanners: Banner[] = [
  {
    id: "test_pickup_banner",
    name: "[Test] Regular Pickup",
    pickup6: 38, // Flutter Page
    pickup5: [125], // Brimley
    version: "2.3",
  },
  {
    id: "test_double_pick_banner",
    name: "[Test] Double Pickup",
    bannerType: "doublePick",
    twoPickup6: [1, 2], // Druvis III, Lilya
    version: "1.0",
  },
  {
    id: "test_standard_banner",
    name: "[Test] Standard Banner",
    pickup6: 1, // Druvis III
    pickup5: [103], // X
    version: "1.0",
  },
];

// Enriched banners (with character objects resolved)
export const mockEnrichedBanners: EnrichedBanner[] = [
  {
    id: "test_pickup_banner_enriched",
    name: "[Test] Regular Pickup Enriched",
    pickup6: mockCharacters.sixStar[2], // Flutter Page
    pickup5: [mockCharacters.fiveStar[1]], // Brimley
    version: "2.3",
  },
  {
    id: "test_double_pick_banner_enriched",
    name: "[Test] Double Pickup Enriched",
    bannerType: "doublePick",
    twoPickup6: [mockCharacters.sixStar[0], mockCharacters.sixStar[1]], // Druvis III, Lilya
    version: "1.0",
  },
];

/**
 * Helper to get a regular pickup banner
 */
export const getRegularPickupBanner = (): EnrichedBanner => mockEnrichedBanners[0];

/**
 * Helper to get a double pickup banner
 */
export const getDoublePickupBanner = (): EnrichedBanner => mockEnrichedBanners[1];
