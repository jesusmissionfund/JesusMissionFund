export function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", { dateStyle: "medium" });
}

export function formatDateTime(date: Date) {
  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
