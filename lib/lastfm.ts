import type { LastFmRecentTracksResponse } from "../types/lastfm";
import { getEnv } from "./getenv";

const LASTFM_BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const LASTFM_METHOD = "user.getrecenttracks";

export async function getRecentTracks(limit = 10) {
	const { LASTFM_API_KEY, LASTFM_USERNAME } = getEnv();

	const params = new URLSearchParams({
		method: LASTFM_METHOD,
		user: LASTFM_USERNAME ?? "",
		api_key: LASTFM_API_KEY ?? "",
		format: "json",
		limit: String(limit),
	});

	const response = await fetch(`${LASTFM_BASE_URL}?${params.toString()}`, {
		headers: {
			Accept: "application/json",
		},
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(
			`Failed to fetch Last.fm recent tracks: ${response.status}`,
		);
	}

	const data: LastFmRecentTracksResponse = await response.json();
	return data;
}
