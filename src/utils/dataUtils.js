// Convert ISO string (YYYY-MM-DD) to readable date
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Days left until due date
export function getDaysLeft(dateStr) {
  const today = new Date();
  const target = new Date(dateStr);
  const diff = target - today;

  return Math.ceil(diff / (1000 * 60 * 60 * 24)); // convert ms → days
}

// Check if overdue
export function isOverdue(dateStr) {
  return getDaysLeft(dateStr) < 0;
}

// Convert date to month index (0–11)
export function getMonthIndex(dateStr) {
  return new Date(dateStr).getMonth();
}
