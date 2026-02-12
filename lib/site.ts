function normalizeUrl(value?: string) {
    if (!value) return undefined;
    if (value.startsWith("http://") || value.startsWith("https://")) {
        return value;
    }
    return `https://${value}`;
}

export function getSiteUrl() {
    const envUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.SITE_URL ||
        process.env.VERCEL_URL;
    const normalized = normalizeUrl(envUrl);

    return new URL(normalized ?? "http://localhost:3000");
}
