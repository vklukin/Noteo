import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { AuthProvider } from "./core/context/AuthContext";
import { persister, queryClient } from "./core/configs/QueryClient";
import { CACHE_LIFE_TIME } from "./core/constants/queries";

import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLDivElement
);
root.render(
    <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister, maxAge: CACHE_LIFE_TIME }}
    >
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </PersistQueryClientProvider>
);
