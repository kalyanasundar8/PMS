const groupByMonth = (items) => {
  const monthTotals = items.reduce((acc, item) => {
    const month = item.date.toLocaleString("default", { month: "long" });
    if (!acc[month]) {
      acc[month] = 0;
    }

    acc[month] += item.amount;
    return acc;
  }, {});

  const result = Object.keys(monthTotals).map((month) => {
    return { month, salary: monthTotals[month] };
  });

  return result;
};

export default groupByMonth;
