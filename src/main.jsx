import "./fonts.css";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// Component to initialize auth check - deferred to not block initial render
function AuthInitializer({ children }) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Defer auth check to not block initial render
    const timer = setTimeout(() => {
      checkAuth().catch(() => {
        // Silently handle errors - user might not be logged in or API might not be available
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [checkAuth]);

  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AuthInitializer>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthInitializer>
    </AuthProvider>
  </StrictMode>
);
