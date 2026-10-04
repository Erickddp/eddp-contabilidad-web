const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

/** $1,234.50 con signo menos tipográfico para negativos. */
export function formatMxn(value: number): string {
  const text = mxn.format(Math.abs(value));
  return value < 0 ? `−${text}` : text;
}
