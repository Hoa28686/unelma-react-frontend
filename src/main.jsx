import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { checkAuth } from "./lib/features/auth/authSlice";
import { AuthProvider } from "./context/AuthContext.jsx";

// Check authentication status on app load (fail silently if API is not available)
store.dispatch(checkAuth()).catch(() => {
  // Silently handle errors - user might not be logged in or API might not be available
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
