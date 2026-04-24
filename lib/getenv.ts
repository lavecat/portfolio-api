export function getEnv() {
    const CLIENT_ID = process.env.MAL_CLIENT_ID;
    const CLIENT_SECRET = process.env.MAL_CLIENT_SECRET;
    const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
    const LASTFM_USERNAME = process.env.LASTFM_USERNAME;
    const STEAM_API_KEY = process.env.STEAM_API_KEY;
    const STEAM_ID = process.env.STEAM_ID;
    const apiKey = process.env.WAKATIME_API_KEY;

    const BASE_URL =
        process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : process.env.NEXT_PUBLIC_BASE_URL ||
            "http://localhost:3001";

    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error("Missing MAL environment variables");
    }

    if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
        throw new Error("Missing LastFM environment variables");
    }

    if (!STEAM_API_KEY || !STEAM_ID) {
        throw new Error("Missing Steam environment variables");
    }

    if (!apiKey) {
        throw new Error("Missing WakaTime environment variables");
    }

    return {
        CLIENT_ID,
        CLIENT_SECRET,
        BASE_URL,
        LASTFM_API_KEY,
        LASTFM_USERNAME,
        STEAM_API_KEY,
        STEAM_ID,
        apiKey,
    };
}