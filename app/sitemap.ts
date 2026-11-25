import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

const publicRoutes = ["/", "/about", "/missionary", "/partner", "/success-stories", "/volunteer", "/signup/missionary", "/signin"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({ url: `${siteUrl}${route}` }));
}
