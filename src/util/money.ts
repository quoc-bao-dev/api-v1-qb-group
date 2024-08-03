export function convertUSDtoVND(amountInUSD) {
    const exchangeRate = 25415;
    const amountInVND = amountInUSD * exchangeRate;

    return Math.round(amountInVND / 1000) * 1000;
}
