import { component$ } from "@builder.io/qwik";
import { PortalView } from "~/components/portal/PortalView";
import { AmbientGlow } from "~/components/shared/AmbientGlow";
import { useUser } from "./layout";

export default component$(() => {
	const user = useUser();

	return (
		<>
			<AmbientGlow />
			{user.value ? (
				<PortalView user={user.value} />
			) : (
				<main
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "100dvh",
						textAlign: "center",
						padding: "var(--space-6) var(--content-padding)",
						position: "relative",
						zIndex: 1,
					}}
				>
					<h1
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "var(--text-3xl)",
							fontWeight: 700,
							background: "var(--accent-gradient)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							marginBottom: "var(--space-4)",
						}}
					>
						Axiom Portal
					</h1>
					<p
						style={{
							fontFamily: "var(--font-ui)",
							fontSize: "var(--text-base)",
							color: "var(--color-text-secondary)",
							marginBottom: "var(--space-8)",
						}}
					>
						Modfolio Connect로 로그인하여 포탈에 접근하세요.
					</p>
					<a
						href="/auth/login"
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "var(--space-2)",
							padding: "var(--space-3) var(--space-6)",
							background: "var(--accent-gradient)",
							borderRadius: "var(--radius-2)",
							color: "var(--color-text-inverse)",
							fontFamily: "var(--font-marketing)",
							fontSize: "var(--text-base)",
							fontWeight: 600,
						}}
					>
						Modfolio Connect로 로그인
					</a>
				</main>
			)}
		</>
	);
});
