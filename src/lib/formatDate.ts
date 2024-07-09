const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        weekday: undefined,
        month: "short",
        day: "numeric",
        year: "numeric",
    };

    return date.toLocaleString("en-US", options);
};

export default formatDate;
