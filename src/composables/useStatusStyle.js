export function useStatusStyle(status){
        if (["active", "verified", "true", true].includes(status)) return "bg-brand";
        if (
          ["rejected", "not verified", "false", "no profile", false].includes(status)
        )
          return "bg-red-500";
        if (["request", "registered", "confirmed"].includes(status))
          return "bg-yellow-400";
        return "bg-gray-400";
}