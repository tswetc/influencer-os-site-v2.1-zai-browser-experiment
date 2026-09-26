import type { MetadataRoute } from "next";

// FP22: minimal sitemap - the landing and the studio (SEO hygiene).
const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://v0-influenceros01.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/app`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
