const API_BASE_URL = "https://jkt48.com/api/v1";
const REQUEST_HEADERS = {
	"Accept": "application/json, text/plain, */*",
	"Referer": "https://jkt48.com/",
	"User-Agent":
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Allow-Methods": "GET,OPTIONS",
	"Cache-Control": "no-store",
	"Content-Type": "application/json; charset=utf-8",
} as const;

type ProxyErrorCode =
	| "METHOD_NOT_ALLOWED"
	| "NOT_FOUND"
	| "UPSTREAM_HTTP_ERROR"
	| "UPSTREAM_INVALID_JSON"
	| "UPSTREAM_WAITING_ROOM"
	| "UPSTREAM_FETCH_FAILED";

interface ErrorBody {
	error: ProxyErrorCode;
	message: string;
	status: false;
}

function json(data: unknown, status = 200): Response {
	return new Response(JSON.stringify(data), {
		headers: CORS_HEADERS,
		status,
	});
}

function error(status: number, body: ErrorBody): Response {
	return json(body, status);
}

function getUpstreamUrl(pathname: string): string | null {
	if (pathname === "/members") {
		return `${API_BASE_URL}/members?lang=id`;
	}

	if (pathname === "/exclusives") {
		return `${API_BASE_URL}/exclusives?lang=id`;
	}

	const detailMatch = pathname.match(/^\/exclusives\/([A-Z0-9]+)$/i);
	if (detailMatch) {
		return `${API_BASE_URL}/exclusives/${detailMatch[1]}?lang=id`;
	}

	return null;
}

async function readJsonOrWaitingRoom(response: Response): Promise<unknown> {
	const contentType = response.headers.get("content-type") ?? "";
	const bodyText = await response.text();
	const trimmed = bodyText.trim();

	if (contentType.includes("text/html") || trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html")) {
		throw new Error("UPSTREAM_WAITING_ROOM");
	}

	try {
		return JSON.parse(bodyText) as unknown;
	} catch {
		throw new Error("UPSTREAM_INVALID_JSON");
	}
}

export default {
	async fetch(request): Promise<Response> {
		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: CORS_HEADERS,
				status: 204,
			});
		}

		if (request.method !== "GET") {
			return error(405, {
				error: "METHOD_NOT_ALLOWED",
				message: "Only GET and OPTIONS are supported.",
				status: false,
			});
		}

		const url = new URL(request.url);
		const upstreamUrl = getUpstreamUrl(url.pathname);

		if (!upstreamUrl) {
			return error(404, {
				error: "NOT_FOUND",
				message: "Unknown API route.",
				status: false,
			});
		}

		try {
			const upstream = await fetch(upstreamUrl, {
				headers: REQUEST_HEADERS,
				method: "GET",
			});

			if (upstream.status === 429 || upstream.status === 503) {
				return error(upstream.status, {
					error: "UPSTREAM_HTTP_ERROR",
					message: `Upstream returned ${upstream.status}.`,
					status: false,
				});
			}

			const payload = await readJsonOrWaitingRoom(upstream);

			if (!upstream.ok) {
				return json(payload, upstream.status);
			}

			return json(payload, 200);
		} catch (caught) {
			const message = caught instanceof Error ? caught.message : "UPSTREAM_FETCH_FAILED";

			if (message === "UPSTREAM_WAITING_ROOM") {
				return error(503, {
					error: "UPSTREAM_WAITING_ROOM",
					message: "JKT48 upstream returned Waiting Room HTML instead of JSON.",
					status: false,
				});
			}

			if (message === "UPSTREAM_INVALID_JSON") {
				return error(502, {
					error: "UPSTREAM_INVALID_JSON",
					message: "JKT48 upstream returned a non-JSON payload.",
					status: false,
				});
			}

			return error(502, {
				error: "UPSTREAM_FETCH_FAILED",
				message: "Failed to reach the JKT48 upstream API.",
				status: false,
			});
		}
	},
} satisfies ExportedHandler<Env>;
