import assert from "node:assert";
import test from "node:test";
import { getDateForDay } from "./dates.mjs";
import daysData from "./days.json" with { type: "json" };

function findDay(name) {
  return daysData.find((d) => d.name === name);
}

test("Ada Lovelace Day 2024 falls on October 8", () => {
  const result = getDateForDay(findDay("Ada Lovelace Day"), 2024);
  assert.equal(result.getUTCFullYear(), 2024);
  assert.equal(result.getUTCMonth(), 9);
  assert.equal(result.getUTCDate(), 8);
});

test("Ada Lovelace Day 2020 falls on October 13", () => {
  const result = getDateForDay(findDay("Ada Lovelace Day"), 2020);
  assert.equal(result.getUTCMonth(), 9);
  assert.equal(result.getUTCDate(), 13);
});

test("World Lemur Day 2024 falls on October 25", () => {
  const result = getDateForDay(findDay("World Lemur Day"), 2024);
  assert.equal(result.getUTCMonth(), 9);
  assert.equal(result.getUTCDate(), 25);
});

test("World Lemur Day 2020 falls on October 30", () => {
  const result = getDateForDay(findDay("World Lemur Day"), 2020);
  assert.equal(result.getUTCMonth(), 9);
  assert.equal(result.getUTCDate(), 30);
});

test("International Binturong Day 2030 falls on May 11", () => {
  const result = getDateForDay(findDay("International Binturong Day"), 2030);
  assert.equal(result.getUTCMonth(), 4);
  assert.equal(result.getUTCDate(), 11);
});

test("Ada Lovelace Day 1900 returns a valid date in October", () => {
  const result = getDateForDay(findDay("Ada Lovelace Day"), 1900);
  assert.equal(result.getUTCMonth(), 9);
});

test("Ada Lovelace Day 2100 returns a valid date in October", () => {
  const result = getDateForDay(findDay("Ada Lovelace Day"), 2100);
  assert.equal(result.getUTCMonth(), 9);
});
