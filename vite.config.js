import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
<<<<<<< HEAD
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom"))
              return "react-vendor";
            if (
              id.includes("@mui/material") ||
              id.includes("@mui/icons-material")
            )
              return "mui-vendor";
=======
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
>>>>>>> dc647b6b814b39e803ef200ea9fc537750285059
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
<<<<<<< HEAD
    hmr: { protocol: "ws" },
  },
  // ✅ Add this section for dev server caching (optional)
  preview: {
    headers: {
      // Cache hashed assets for 1 year
      "Cache-Control": "public, max-age=31536000, immutable",
=======
    hmr: {
      protocol: "ws",
>>>>>>> dc647b6b814b39e803ef200ea9fc537750285059
    },
  },
});
