import { Hono } from "hono";
import { getEnv } from "../../lib/getenv.js";

const wakatimeRoutes = new Hono().get("/stats", async (c) => {
	try {
		const { apiKey } = getEnv();
		if (!apiKey) {
			return c.json({ error: "WakaTime API key not configured" }, 500);
		}

		const authHeader = `Basic ${Buffer.from(apiKey).toString("base64")}`;
		
		const allTimeRes = await fetch(
			"https://api.wakatime.com/api/v1/users/current/all_time_since_today",
			{ headers: { Authorization: authHeader } }
		);

		if (!allTimeRes.ok) {
			throw new Error(`Failed to fetch: ${allTimeRes.status}`);
		}

		const allTimeData = await allTimeRes.json();
		const { total_seconds, range } = allTimeData.data;

		const statsRes = await fetch(
			"https://api.wakatime.com/api/v1/users/current/stats/all_time",
			{ headers: { Authorization: authHeader } }
		);

		if (!statsRes.ok) {
			throw new Error(`Failed to fetch stats: ${statsRes.status}`);
		}

		const statsData = await statsRes.json();

		return c.json({
			total_seconds,
			languages: statsData.data.languages || [],
			editors: statsData.data.editors || [],
			start_date: range?.start,
			human_readable_range: range?.start_text || "All Time",
		});
	} catch (error) {
		console.error("WakaTime API Error:", error);
		return c.json({ error: "Failed to fetch WakaTime stats" }, 500);
	}
});

export default wakatimeRoutes;
