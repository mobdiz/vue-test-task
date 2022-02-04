export function numToCurrency(value: number): string {
  if (!value) return "";

  return value.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });
}
