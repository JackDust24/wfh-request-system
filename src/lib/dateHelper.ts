export function getWeekDates(startDate: Date): string[] {
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date.toISOString().slice(0, 10);
  });
}
