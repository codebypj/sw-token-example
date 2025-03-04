/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

// This is needed for Vite PWA
import { precacheAndRoute } from "workbox-precaching";

// Precache all assets generated by Vite PWA
precacheAndRoute(self.__WB_MANIFEST);

let authToken: string | null = null;

// Handle messages from the main app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SET_TOKEN") {
    console.debug("Service Worker: Received new token");
    authToken = event.data.token;
  }
});

// Intercept fetch requests
self.addEventListener("fetch", (event) => {
  console.debug("Service Worker: Intercepting API request:", event.request.url);

  event.respondWith(
    (async () => {
      try {
        const modifiedRequest = new Request(event.request, {
          headers: {
            ...event.request.headers,
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
        });

        return await fetch(modifiedRequest);
      } catch (error) {
        console.error("Service Worker: Fetch error:", error);
        throw error;
      }
    })(),
  );
});

// Activate the service worker immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
