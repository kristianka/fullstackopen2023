import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationContextProvider } from "./NotificationContext.jsx";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient} >
        <NotificationContextProvider>
            <App />
        </NotificationContextProvider>
    </QueryClientProvider>

)
