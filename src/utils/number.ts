export function formatNumberWithCommas(input: any) {
    const number = parseFloat(input);
    if (!isNaN(number)) {
        const formattedNumber = number.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formattedNumber;
    } else {
        return "Invalid number";
    }
}
