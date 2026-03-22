import { component$ } from "@builder.io/qwik";
import { AppShowcase } from "~/components/landing/AppShowcase";
import { CTASection } from "~/components/landing/CTASection";
import { HeroSection } from "~/components/landing/HeroSection";
import { NarrativeSection } from "~/components/landing/NarrativeSection";
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
				<main>
					<HeroSection />
					<NarrativeSection />
					<AppShowcase />
					<CTASection />
				</main>
			)}
		</>
	);
});
