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
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Missing ?url= parameter" }));
          return;
        }
        // Normalize URL — prepend https:// if no protocol
        let targetUrl = url;
        if (!/^https?:\/\//i.test(targetUrl)) {
          targetUrl = `https://${targetUrl}`;
        }
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);
          const response = await fetch(targetUrl, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
              "Accept-Language": "en-US,en;q=0.9",
            },
            redirect: "follow",
            signal: controller.signal,
          });
          clearTimeout(timeout);

          if (!response.ok) {
            console.warn(
              `[fetch-page-proxy] Upstream returned ${response.status} for ${targetUrl}`,
            );
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });
            res.end(
              JSON.stringify({
                error: `Target page returned HTTP ${response.status} (${response.statusText})`,
                status: response.status,
              }),
            );
            return;
          }

          const contentType = response.headers.get("content-type") ?? "";
          if (
            !contentType.includes("text/html") &&
            !contentType.includes("application/xhtml")
          ) {
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });
            res.end(
              JSON.stringify({
                error: `Target URL returned non-HTML content (${contentType})`,
              }),
            );
            return;
          }

          const html = await response.text();
          res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          });
          res.end(html);
        } catch (err: unknown) {
          const message =
            err instanceof Error && err.name === "AbortError"
              ? "Request timed out after 15 seconds"
              : `Failed to fetch: ${err}`;
          console.error(`[fetch-page-proxy] ${message} — ${targetUrl}`);
          res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          res.end(JSON.stringify({ error: message }));
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

          const authHeader = req.headers.authorization ?? "";
          console.log("[OpenAI Proxy] Request to:", targetUrl);
          console.log("[OpenAI Proxy] Auth header present:", !!authHeader && authHeader.length > 10);

          const response = await fetch(targetUrl, {
            method: req.method ?? "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
            body,
          });

          const responseBody = await response.text();
          console.log("[OpenAI Proxy] Response status:", response.status);
          if (response.status !== 200) {
            console.log("[OpenAI Proxy] Error response:", responseBody.slice(0, 500));
          }
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
  server: {},
});
