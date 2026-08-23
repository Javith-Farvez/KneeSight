export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(d);
  } catch {
    return dateString;
  }
}

export function formatConfidence(score: number): string {
  return `${(score * (score <= 1 ? 100 : 1)).toFixed(1)}%`;
}

export function formatMeasurement(val: number, unit: string, decimals = 1): string {
  return `${val > 0 && unit === 'mm' && val > 0 ? '' : ''}${val.toFixed(decimals)} ${unit}`;
}

export function formatMrn(mrn: string): string {
  return mrn.toUpperCase();
}
