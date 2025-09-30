export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB')
}

export function formatDateForInput(date: string): string {
  return date // Already in YYYY-MM-DD format
}

export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0]
}