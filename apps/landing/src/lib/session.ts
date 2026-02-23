import { createRemoteJWKSet, jwtVerify } from "jose";
import { getConnectUrl } from "./auth";

export interface SessionUser {
	id: string;
	email: string;
	name: string;
	roles: string[];
}

let jwksCache: ReturnType<typeof createRemoteJWKSet> | null = null;
let jwksCacheUrl = "";

function getJWKS(connectUrl: string) {
	if (!jwksCache || jwksCacheUrl !== connectUrl) {
		jwksCache = createRemoteJWKSet(
			new URL(`${connectUrl}/.well-known/jwks.json`),
		);
		jwksCacheUrl = connectUrl;
	}
	return jwksCache;
}

export async function verifySession(
	token: string | undefined | null,
): Promise<SessionUser | null> {
	if (!token) return null;

	try {
		const connectUrl = getConnectUrl();
		const JWKS = getJWKS(connectUrl);
		const { payload } = await jwtVerify(token, JWKS, {
			algorithms: ["ES256"],
			issuer: connectUrl,
		});

		if (
			typeof payload.sub !== "string" ||
			typeof payload.email !== "string"
		) {
			return null;
		}

		return {
			id: payload.sub,
			email: payload.email as string,
			name:
				typeof payload.name === "string"
					? payload.name
					: (payload.email as string),
			roles: Array.isArray(payload.roles)
				? (payload.roles as string[])
				: [],
		};
	} catch {
		return null;
	}
}
