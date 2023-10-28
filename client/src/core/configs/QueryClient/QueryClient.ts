import { QueryClient } from "@tanstack/react-query";

import { CACHE_LIFE_TIME } from "../../constants/queries";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: CACHE_LIFE_TIME,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false
        }
    }
});
