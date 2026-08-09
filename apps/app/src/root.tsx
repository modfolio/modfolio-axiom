import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";

import "./styles/layers.css";
import "./styles/reset.css";
import "./styles/tokens/primitives.css";
import "./styles/tokens/semantic.css";
import "./styles/tokens/accent.css";
import "./styles/typography.css";

export default component$(() => {
	return (
		<QwikCityProvider>
			<head>
					{/* v4 type — self-host. @font-face 는 fonts.css(생성물). */}
					<link rel="stylesheet" href="/fonts.css" />

				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Modfolio Axiom</title>
				<meta name="description" content="테크놀로지 & 모빌리티 그룹 포탈" />

				{/* Dark UI — render native controls/scrollbars/form fields dark and
				    avoid a light flash before the stylesheet's dark surfaces apply. */}
				<meta name="color-scheme" content="dark" />
				<meta name="theme-color" content="#0a0a14" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="canonical" href="https://nexus.modfolio.io" />

				{/* Social / Open Graph (no og:image — a raster card is an owner-supplied
				    asset; summary card degrades gracefully without one). */}
				<meta property="og:title" content="Modfolio Axiom" />
				<meta property="og:description" content="테크놀로지 & 모빌리티 그룹 포탈" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://nexus.modfolio.io" />
				<meta property="og:locale" content="ko_KR" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Modfolio Axiom" />
				<meta name="twitter:description" content="테크놀로지 & 모빌리티 그룹 포탈" />

				{/* Font origins — warm both TCP+TLS connections before the
				    render-blocking stylesheets. `crossorigin` is required on the
				    Typekit preconnect: the font files it pulls are CORS requests,
				    so a preconnect without it opens a second, unreused connection.
				    Pretendard is served from jsDelivr, which had no preconnect —
				    its stylesheet was blocking paint against a cold origin. */}
				<link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
				<link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />

				{/* Master Typekit (fmh4fod) */}
				<link rel="stylesheet" href="https://use.typekit.net/fmh4fod.css" />

				{/* Pretendard — Korean sans-serif fallback */}
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
				/>
			</head>
			<body>
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	);
});
