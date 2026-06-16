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
let currentMonth;
let currentYear;
function renderCalendar(month, year) {
  const calendar = document.querySelector("#calendar");
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendar.innerHTML = `<h2>${months[month]} ${year}</h2>`;
  const headerRow = document.createElement("div");
  headerRow.style.display = "grid";
  headerRow.style.gridTemplateColumns = "repeat(7, 1fr)";
  headerRow.style.marginBottom = "10px";
  weekDays.forEach((day) => {
    const dayCell = document.createElement("span");
    dayCell.textContent = day;
    dayCell.style.textAlign = "center";
    dayCell.style.fontWeight = "bold";
    headerRow.appendChild(dayCell);
  });
  calendar.appendChild(headerRow);
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(7, 1fr)";
  grid.style.gap = "4px";

  calendar.appendChild(grid);
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyCell = document.createElement("div");
    emptyCell.textContent = "";
    grid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.textContent = day;
    dayCell.style.border = "1px solid black";
    dayCell.style.minHeight = "50px";
    dayCell.style.padding = "4px";
    grid.appendChild(dayCell);
  }
}

window.onload = () => {
  const monthSelect = document.querySelector("#month-select");
  const yearSelect = document.querySelector("#year-select");
  const previousButton = document.querySelector("#previous");
  const nextButton = document.querySelector("#next");

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
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
  renderCalendar(currentMonth, currentYear);

  previousButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
    renderCalendar(currentMonth, currentYear);
  });

  nextButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
    renderCalendar(currentMonth, currentYear);
  });
};
