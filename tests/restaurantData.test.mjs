import assert from "node:assert/strict";
import test from "node:test";

import {
  fallbackMenuCategories,
  fallbackOpeningHours,
  normalizeDrinkCategories,
  normalizeMenuCategories,
} from "../src/data/restaurantData.ts";

test("valid menu content containing Classic is preserved", () => {
  const liveCategories = [
    {
      id: "starters",
      name: "Vorspeisen",
      image_url: null,
      description: null,
      display_order: 1,
      menu_items: [
        {
          id: "bolani",
          name: "Bolani Classic",
          price: 7.9,
          description: null,
          display_order: 1,
        },
      ],
    },
  ];

  const normalized = normalizeMenuCategories(liveCategories);

  assert.equal(normalized[0].menu_items[0].name, "Bolani Classic");
  assert.notStrictEqual(normalized, liveCategories);
});

test("live Karahi prices survive normalization unchanged", () => {
  const liveCategories = [
    {
      id: "mains",
      name: "Reisgerichte & Karahi",
      image_url: null,
      description: null,
      display_order: 1,
      menu_items: [
        { id: "chicken", name: "Karahi Hähnchen", price: 18.9, description: null, display_order: 2 },
        { id: "lamb", name: "Karahi Lamm", price: 23.9, description: null, display_order: 1 },
      ],
    },
  ];

  const [category] = normalizeMenuCategories(liveCategories);

  assert.deepEqual(
    category.menu_items.map(({ name, price }) => [name, price]),
    [
      ["Karahi Lamm", 23.9],
      ["Karahi Hähnchen", 18.9],
    ],
  );
});

test("null display orders sort last without mutating the source", () => {
  const liveCategories = [
    {
      id: "drinks",
      name: "Getränke",
      image_url: null,
      display_order: 1,
      drink_items: [
        { id: "unordered", name: "Unordered", price: 1, display_order: null },
        { id: "first", name: "First", price: 2, display_order: 1 },
      ],
    },
  ];

  const normalized = normalizeDrinkCategories(liveCategories);

  assert.deepEqual(normalized[0].drink_items.map(({ id }) => id), ["first", "unordered"]);
  assert.deepEqual(liveCategories[0].drink_items.map(({ id }) => id), ["unordered", "first"]);
});

test("offline fallbacks mirror the latest confirmed live values", () => {
  const karahi = fallbackMenuCategories
    .flatMap(({ menu_items }) => menu_items)
    .filter(({ name }) => name.startsWith("Karahi"));
  const monday = fallbackOpeningHours.find(({ day_of_week }) => day_of_week === "Monday");

  assert.deepEqual(
    karahi.map(({ name, price }) => [name, price]),
    [
      ["Karahi Lamm", 23.9],
      ["Karahi Hähnchen", 18.9],
    ],
  );
  assert.equal(monday?.close_time, "22:00:00");
});
