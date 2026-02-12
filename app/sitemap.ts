import type { MetadataRoute } from "next";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = getSiteUrl();
    const lastModified = new Date();

    return SUPPORTED_LANGUAGES.map((lang) => ({
        url: new URL(`/${lang}`, baseUrl).toString(),
        lastModified,
        changeFrequency: "weekly",
        priority: 1,
    }));
}
