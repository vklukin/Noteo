import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"

import App from "./App"
import { AuthProvider } from "./core/context/AuthContext"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement)
root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)
