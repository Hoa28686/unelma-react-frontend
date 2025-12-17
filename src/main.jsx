import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Import axios setup to initialize global interceptors for 401/403 handling
import "./utils/axiosSetup.js";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
