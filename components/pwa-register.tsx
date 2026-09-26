"use client";

// Fix Pack 21: registers the static-shell service worker (public/sw.js).
// Production only — dev servers and previews stay uncached. The worker
// never touches /api/* or non-GET requests, so license checks always hit
// the network (see the note in app/layout.tsx).

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return null;
}
