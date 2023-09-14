export function formatDate(inputDateString: string, showTime?: boolean) {
    const inputDate = new Date(inputDateString);
    let options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
    } as any;

    if (showTime) {
        options = { ...options, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
    }

    return inputDate.toLocaleString("en-US", options as any);
}
