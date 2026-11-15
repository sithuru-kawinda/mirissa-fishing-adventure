import type { MetadataRoute } from "next";
import { packages } from "@/data/packages";
import { navItems, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...navItems.map((n) => n.href), "/booking", ...packages.map((p) => `/packages/${p.slug}`)];
  return routes.map((r) => ({ url: `${site.url}${r}` }));
}
