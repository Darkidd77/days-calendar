import { writeFileSync } from "fs";
import { getDateForDay } from "./dates.mjs";
import daysData from "./days.json" with { type: "json" };

function formatDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function generateICS() {
  let output = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\n";

  daysData.forEach((day) => {
    for (let year = 2020; year <= 2030; year++) {
      const date = getDateForDay(day, year);
      const dateStr = formatDate(date);

      output += "BEGIN:VEVENT\r\n";
      output += `SUMMARY:${day.name}\r\n`;
      output += `DTSTART;VALUE=DATE:${dateStr}\r\n`;
      output += `UID:${day.name.replace(/\s+/g, "-")}-${year}@days-calendar\r\n`;
      output += "END:VEVENT\r\n";
    }
  });

  output += "END:VCALENDAR\r\n";
  return output;
}

writeFileSync("days.ics", generateICS());
console.log("days.ics generated successfully");
