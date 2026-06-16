// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function renderCalendar(month, year) {
  const calendar = document.querySelector("#calendar");
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(year, month, 1);
  console.log(firstDay);
console.log(firstDay.getDay());
  const daysInMonth =
  new Date(year, month + 1, 0).getDate();
  console.log(daysInMonth);


  calendar.innerHTML = `<h2>${months[month]} ${year}</h2>`;
  const headerRow = document.createElement("div");
  weekDays.forEach((day) => {
    const dayCell = document.createElement("span");
    dayCell.textContent = day;
    dayCell.style.marginRight = "18px";
    headerRow.appendChild(dayCell);
  });
  calendar.appendChild(headerRow);
}

window.onload = () => {
  const monthSelect = document.querySelector("#month-select");
  const yearSelect = document.querySelector("#year-select");

  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  for (let year = 1900; year <= 2100; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  const today = new Date();
  renderCalendar(today.getMonth(), today.getFullYear());
  monthSelect.value = today.getMonth();
  yearSelect.value = today.getFullYear();
};
