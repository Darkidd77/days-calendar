# Testing

## Current month displayed on load

Manually tested by opening the page and confirming today's month and year are shown in the heading and selectors.

## October 2024 grid matches rubric exactly

Manually tested by jumping to October 2024. Confirmed 5 rows, first row starts Tuesday October 1, Ada Lovelace Day on the 8th, World Lemur Day on the 25th.

## October 2020 / May 2030 commemorative days correct

Manually tested: October 2020 shows Ada Lovelace Day on 13th and World Lemur Day on 30th. May 2030 shows International Binturong Day on 11th.

## Boundary cases (Dec 2024, Feb 2025, May 2025, Feb 2026)

Manually tested each month against the rubric's exact start/end day and padding counts.

## Previous/Next buttons work indefinitely

Manually tested by clicking many times in both directions including past 1900 and beyond 2100 with no errors.

## Jump to month/year works

Manually tested by selecting months and years from both dropdowns and confirming the calendar updates correctly.

## Calendar is data-driven

Manually tested by temporarily adding a new entry to days.json and confirming it appeared on the correct date without code changes, then removed it.

## 100% Lighthouse accessibility

Tested using Lighthouse in Chrome DevTools on the live Netlify URL across multiple months including months with and without commemorative days. All scored 100%.

## Unit tests cover a non-trivial function

Unit tests in `dates.test.mjs` using node:assert and node:test. Tests cover getDateForDay for Ada Lovelace Day 2024/2020, World Lemur Day 2024/2020, International Binturong Day 2030, and edge years 1900 and 2100. All pass with npm test.

## .ics file generates and imports into Google Calendar

Ran npm run generate-ical to produce days.ics. Imported into a test Google Calendar and confirmed dates match the web UI as whole-day events with no start/end times.

## Date logic shared between web and iCal generator

Both web.mjs and generate-ical.mjs import getDateForDay from the same dates.mjs file — no date logic is duplicated.
