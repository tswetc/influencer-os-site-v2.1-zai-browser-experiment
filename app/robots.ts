import type { MetadataRoute } from "next";

// FP22: robots - index the product, keep the API away from crawlers.
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://v0-influenceros01.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
