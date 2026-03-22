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
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Modfolio Axiom</title>
				<meta name="description" content="테크놀로지 & 모빌리티 그룹 포탈" />

				{/* Master Typekit (fmh4fod) */}
				<link rel="preconnect" href="https://use.typekit.net" />
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
