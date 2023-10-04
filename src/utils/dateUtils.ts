export function formatDateTime(inputDateString: string, showTime?: boolean) {
    if (!inputDateString) return "--";

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

export const formatDate = (dateString: string) => {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Converts to YYYY-MM-DD format
};

export const currentDate = () => {
    var dt = new Date();
    return new Date(dt.getTime() + Math.abs(dt.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
};
