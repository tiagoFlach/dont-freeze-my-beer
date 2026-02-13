import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = getSiteUrl();

    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: new URL("/sitemap.xml", baseUrl).toString(),
        host: baseUrl.toString(),
    };
}
