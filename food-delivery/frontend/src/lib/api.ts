export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
    /\/+$/,
    "",
);

if (!API_URL && typeof window !== "undefined") {
    console.error(
        "NEXT_PUBLIC_API_URL is missing. Set it in Vercel Project Settings → Environment Variables.",
    );
}
