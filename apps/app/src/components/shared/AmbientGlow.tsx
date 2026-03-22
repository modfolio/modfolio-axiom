import { component$, useStylesScoped$ } from "@builder.io/qwik";

export const AmbientGlow = component$(() => {
	useStylesScoped$(`
		.glow {
			position: fixed;
			width: var(--glow-size);
			height: var(--glow-size);
			border-radius: 50%;
			filter: blur(var(--glow-blur));
			opacity: var(--glow-opacity);
			pointer-events: none;
			z-index: 0;
		}

		.glow--primary {
			background: var(--glow-primary);
			top: -200px;
			right: -200px;
		}

		.glow--secondary {
			background: var(--glow-secondary);
			bottom: -200px;
			left: -200px;
		}
	`);

	return (
		<>
			<div class="glow glow--primary" aria-hidden="true" />
			<div class="glow glow--secondary" aria-hidden="true" />
		</>
	);
});
