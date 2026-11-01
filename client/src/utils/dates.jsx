const pad = (n) => String(n).padStart(2, "0");

// Local-time "YYYY-MM-DD" (avoids the UTC shift that toISOString() causes)
export const toDateString = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Records from today and the 6 days before it, summed per date
export const getLast7DaysData = (records) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 6);

  const from = toDateString(start);
  const to = toDateString(end);

  const byDate = {};
  records.forEach((r) => {
    if (r.date >= from && r.date <= to) {
      if (!byDate[r.date]) byDate[r.date] = { date: r.date, intake: 0, burned: 0 };
      byDate[r.date].intake += Number(r.intake);
      byDate[r.date].burned += Number(r.burned);
    }
  });

  return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
};