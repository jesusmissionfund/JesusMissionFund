export function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", { dateStyle: "medium" });
}
