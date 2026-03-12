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
        // Normalize URL — prepend https:// if no protocol
        let targetUrl = url;
        if (!/^https?:\/\//i.test(targetUrl)) {
          targetUrl = `https://${targetUrl}`;
        }
        try {
          const response = await fetch(targetUrl, {
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

/**
 * Vite plugin that proxies /api/openai/* requests to api.openai.com,
 * avoiding CORS issues when calling OpenAI from the browser in dev mode.
 */
function openaiProxy(): Plugin {
  return {
    name: "openai-proxy",
    configureServer(server) {
      server.middlewares.use("/api/openai", async (req, res) => {
        // Handle CORS preflight
        if (req.method === "OPTIONS") {
          res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          });
          res.end();
          return;
        }

        const targetPath = (req.url ?? "").replace(/^\//, "");
        const targetUrl = `https://api.openai.com/v1/${targetPath}`;

        try {
          // Read request body
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
          }
          const body = Buffer.concat(chunks).toString();

          const response = await fetch(targetUrl, {
            method: req.method ?? "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: req.headers.authorization ?? "",
            },
            body,
          });

          const responseBody = await response.text();
          res.writeHead(response.status, {
            "Content-Type": response.headers.get("content-type") ?? "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          res.end(responseBody);
        } catch (err) {
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end(`OpenAI proxy error: ${err}`);
        }
      });
    },
  };
}

// Dev preview config — no CRXJS, just serves the side panel UI in a browser tab
export default defineConfig({
  plugins: [react(), fetchPageProxy(), openaiProxy()],
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
