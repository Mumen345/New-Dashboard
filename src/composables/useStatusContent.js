export function useStatusContent(status)
{
    if (status === "active") return "active";
    if (status === "request") return "request";
    if (status === "rejected") return "rejected";
    if (status === true) return "true";
    if (status === false) return "false";
    return status;
}