// export const EXCHANGE_RATE_USD_TO_IDR = 18000;
export const EXCHANGE_RATE_USD_TO_IDR = 18101;

export function formatPrice(amountInIDR, currency, language) {
  if (currency === "USD") {
    const usd = amountInIDR / EXCHANGE_RATE_USD_TO_IDR;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(usd);
  }
  const locale = language === "ID" ? "id-ID" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amountInIDR);
}
