import { getDateForDay } from "./dates.mjs";
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

function getCommemorativeDaysForMonth(year, month) {
  const result = {};
  daysData.forEach((day) => {
    const date = getDateForDay(day, year);
    if (date.getUTCMonth() === month) {
      const dayOfMonth = date.getUTCDate();
      if (!result[dayOfMonth]) result[dayOfMonth] = [];
      result[dayOfMonth].push(day.name);
    }
  });
  return result;
}

function renderCalendar(month, year) {
  const calendar = document.querySelector("#calendar");
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(Date.UTC(year, month, 1));
  const firstDayOfWeek = firstDay.getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const commemorativeDays = getCommemorativeDaysForMonth(year, month);

  calendar.innerHTML = `<h2>${months[month]} ${year}</h2>`;

  const headerRow = document.createElement("div");
  headerRow.classList.add("calendar-header");
  weekDays.forEach((day) => {
    const dayCell = document.createElement("span");
    dayCell.textContent = day;
    dayCell.classList.add("weekday");
    headerRow.appendChild(dayCell);
  });
  calendar.appendChild(headerRow);

  const grid = document.createElement("div");
  grid.classList.add("calendar-grid");
  calendar.appendChild(grid);

  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement("div");
    grid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day-cell");

    const dayNumber = document.createElement("span");
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    if (commemorativeDays[day]) {
      commemorativeDays[day].forEach((name) => {
        const label = document.createElement("p");
        label.textContent = name;
        label.classList.add("commemorative-day");
        dayCell.appendChild(label);
      });
    }

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

  monthSelect.addEventListener("change", () => {
    currentMonth = parseInt(monthSelect.value, 10);
    renderCalendar(currentMonth, currentYear);
  });

  yearSelect.addEventListener("change", () => {
    currentYear = parseInt(yearSelect.value, 10);
    renderCalendar(currentMonth, currentYear);
  });

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
