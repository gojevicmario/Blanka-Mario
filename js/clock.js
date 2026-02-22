(function () {

  const target = new Date("2026-06-13T12:30:00Z");

  function getTimeParts(now, target) {
    if (now >= target) {
      return { months: 0, days: 0, hours: 0, minutes: 0 };
    }

    let start = new Date(now);

    let months =
      (target.getFullYear() - start.getFullYear()) * 12 +
      (target.getMonth() - start.getMonth());

    let testDate = new Date(start);
    testDate.setMonth(testDate.getMonth() + months);

    if (testDate > target) {
      months--;
      testDate.setMonth(testDate.getMonth() - 1);
    }

    let diff = target - testDate;

    const totalMinutes = Math.floor(diff / 60000);

    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    return { months, days, hours, minutes };
  }

  function getLabel(value, one, few, many) {
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return many;
    if (lastDigit === 1) return one;
    if (lastDigit >= 2 && lastDigit <= 4) return few;
    return many;
  }

  function getMonthsLabel(value) {
    return getLabel(value, "mjesec", "mjeseca", "mjeseci");
  }

  function getDaysLabel(value) {
    return getLabel(value, "dan", "dana", "dana");
  }

  function getHoursLabel(value) {
    return getLabel(value, "sat", "sata", "sati");
  }

  function getMinutesLabel(value) {
    return getLabel(value, "minutu", "minute", "minuta");
  }

  function updateCountdown() {
    const now = new Date();
    const t = getTimeParts(now, target);

    document.getElementById("months").textContent = t.months;
    document.getElementById("months-label").textContent = getMonthsLabel(t.months);

    document.getElementById("days").textContent = t.days;
    document.getElementById("days-label").textContent = getDaysLabel(t.days);

    document.getElementById("hours").textContent = String(t.hours).padStart(2, "0");
    document.getElementById("hours-label").textContent = getHoursLabel(t.hours);

    document.getElementById("minutes").textContent = String(t.minutes).padStart(2, "0");
    document.getElementById("minutes-label").textContent = getMinutesLabel(t.minutes);
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);

})();