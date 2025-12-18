import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Only separate big libraries that benefit most from caching
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (
              id.includes("@mui/material") ||
              id.includes("@mui/icons-material")
            ) {
              return "mui-vendor";
            }
            // Let Redux and others stay in main bundle to avoid runtime import issues
          }
        },
      },
    },
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    target: "es2015",
  },
  optimizeDeps: {
    include: [
      "@mui/material",
      "@mui/icons-material",
      "react",
      "react-dom",
      "react-router-dom",
    ],
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production"
    ),
  },
  server: {
    hmr: {
      protocol: "ws",
    },
  },
});
