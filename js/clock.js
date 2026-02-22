
(function () {

  const target = new Date("2026-06-13T12:30:00Z"); // Zagreb summer time

  function getTimeParts(now, target) {
    if (now >= target) {
      return { months: 0, days: 0, hours: 0, minutes: 0 };
    }

    let start = new Date(now);

    // ---- Calculate months ----
    let months =
      (target.getFullYear() - start.getFullYear()) * 12 +
      (target.getMonth() - start.getMonth());

    let testDate = new Date(start);
    testDate.setMonth(testDate.getMonth() + months);

    // If we overshot, step back one month
    if (testDate > target) {
      months--;
      testDate.setMonth(testDate.getMonth() - 1);
    }

    // ---- Remaining difference ----
    let diff = target - testDate;

    const totalMinutes = Math.floor(diff / 60000);

    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    return { months, days, hours, minutes };
  }


  function getMonthsLabel(value) {
  const lastDigit = value % 10;
  const lastTwoDigits = value % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return "mjeseci";
  if (lastDigit === 1) return "mjesec";
  if (lastDigit >= 2 && lastDigit <= 4) return "mjeseca";
  return "mjeseci";
}

function getMinutesLabel(value) {
  value = Math.abs(value);
  const lastDigit = value % 10;
  const lastTwoDigits = value % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "minuta";
  }

  if (lastDigit === 1) {
    return "minuta";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "minute";
  }

  return "minuta";
}



function updateCountdown() {
  const now = new Date();
  const t = getTimeParts(now, target);

  document.getElementById("months").textContent = t.months;
  document.getElementById("months-label").textContent =
    getMonthsLabel(t.months)

document.getElementById("minutes-label").textContent =
  getMinutesLabel(t.minutes);

  document.getElementById("days").textContent = t.days;
  document.getElementById("hours").textContent = String(t.hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(t.minutes).padStart(2, "0");
}


  updateCountdown();
  setInterval(updateCountdown, 60000); 

})();
