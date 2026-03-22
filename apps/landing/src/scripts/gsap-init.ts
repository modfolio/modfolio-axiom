import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.documentElement.setAttribute("data-gsap-ready", "");

/* ── Manifesto pin ── */
const manifestoTrigger = document.querySelector(".manifesto");
const manifestoPin = document.querySelector(".manifesto__pin");

if (manifestoTrigger && manifestoPin) {
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".manifesto",
			pin: ".manifesto__pin",
			start: "top top",
			end: "+=300%",
			scrub: 0.5,
		},
	});

	tl.from(".manifesto__line", {
		opacity: 0.15,
		y: 8,
		stagger: 0.15,
	});
}

/* ── Domain cards stagger ── */
const domainsGrid = document.querySelector(".domains__grid");

if (domainsGrid) {
	gsap.from(".domain-card", {
		scrollTrigger: {
			trigger: ".domains__grid",
			start: "top 80%",
		},
		opacity: 0,
		y: 24,
		duration: 0.6,
		stagger: 0.08,
		ease: "power2.out",
	});
}

/* ── Steps slide-in ── */
const stepsList = document.querySelector(".steps__list");

if (stepsList) {
	gsap.from(".step", {
		scrollTrigger: {
			trigger: ".steps__list",
			start: "top 75%",
		},
		opacity: 0,
		x: -40,
		duration: 0.7,
		stagger: 0.15,
		ease: "power2.out",
	});
}

/* ── CTA fade ── */
const ctaSection = document.querySelector(".cta");

if (ctaSection) {
	gsap.from(".cta__inner", {
		scrollTrigger: {
			trigger: ".cta",
			start: "top 85%",
		},
		opacity: 0,
		y: 20,
		duration: 0.8,
	});
}
