// handles currency format
export function formatCurrency(money) {
  let fmt = parseInt(money)
    .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
    .split(".")[0];

  let currency = fmt.slice(0, 1);
  let price = fmt.slice(1);
  return { currency, price };
}