import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

/**
 * Vite plugin that proxies /api/fetch-page?url=... requests,
 * fetching the target URL server-side to avoid CORS issues.
 */
function fetchPageProxy(): Plugin {
  return {
    name: "fetch-page-proxy",
    configureServer(server) {
      server.middlewares.use("/api/fetch-page", async (req, res) => {
        const url = new URL(req.url ?? "", "http://localhost").searchParams.get(
          "url",
        );
        if (!url) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Missing ?url= parameter");
          return;
        }
        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (compatible; SEOCopilot/1.0; +https://example.com)",
              Accept: "text/html",
            },
            redirect: "follow",
          });
          const html = await response.text();
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          });
          res.end(html);
        } catch (err) {
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end(`Failed to fetch: ${err}`);
        }
      });
    },
  };
}

// Dev preview config — no CRXJS, just serves the side panel UI in a browser tab
export default defineConfig({
  plugins: [react(), fetchPageProxy()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  root: ".",
  server: {
    open: "/dev.html",
  },
});
