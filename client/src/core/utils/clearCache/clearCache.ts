import { persister, queryClient } from "../../configs/QueryClient";

export function clearCache(): void {
    persister.removeClient();
    queryClient.removeQueries();
}
