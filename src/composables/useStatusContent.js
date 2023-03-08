export function useStatusContent(status)
{
    if (status === "active" || status === true) return "active";
    if (status === "request") return "request";
    if (status === "rejected") return "rejected";
    if (status === false) return "inactive";
    return status;
}