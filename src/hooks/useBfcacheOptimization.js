import { useEffect } from "react";

/**
 * Hook to optimize pages for back/forward cache (bfcache)
 * This helps pages restore faster when navigating back/forward
 * 
 * Note: In development mode, Vite's HMR WebSocket prevents bfcache.
 * This is expected behavior and won't affect production builds.
 */
export function useBfcacheOptimization() {
  useEffect(() => {
    // Handle page restoration from bfcache
    const handlePageShow = (event) => {
      // If page was restored from bfcache, the persisted property is true
      if (event.persisted) {
        // Page was restored from bfcache
        // You can refresh data here if needed, but avoid heavy operations
        // Most React state should be preserved automatically
      }
    };

    // Handle page being hidden (entering bfcache)
    const handlePageHide = (event) => {
      // If page is being cached, the persisted property is true
      if (event.persisted) {
        // Page is entering bfcache
        // Close any modals/dialogs that might prevent bfcache
        // Clean up any resources that shouldn't persist
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);
}
