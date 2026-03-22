export interface SubsidiaryApp {
	id: string;
	name: string;
	desc: string;
	domain: string;
	appUrl: string;
	landingUrl: string;
	status: "active" | "landing" | "development";
	accent: string;
}

export const apps: SubsidiaryApp[] = [
	{
		id: "amberstella",
		name: "Amberstella",
		desc: "실시간 셔틀 위치 추적 & 탑승 관리",
		domain: "amberstella.com",
		appUrl: "https://app.amberstella.com",
		landingUrl: "https://amberstella.com",
		status: "landing",
		accent: "var(--amber-9)",
	},
];
