/**
 * Applied-technology domain taxonomy for the Axiom portal.
 *
 * Canonical source: knowledge/projects/axiom-landing-content.md
 * (the repo's own content map — the six domains, their numbers, English
 * titles, Korean subtitles, and Overview opening lines are reproduced
 * verbatim from that document). The landing site renders the same six
 * domains; the authenticated portal surfaces them as a discovery section
 * so a logged-in user sees the full taxonomy, not just the app grid.
 *
 * `appIds` links each domain to entries in `~/data/apps` by their `id`.
 * The per-domain app count shown in the portal is derived from `apps`
 * (the registry is the source of truth), so a domain with no registered
 * app renders a real empty state rather than fabricated "coming soon" copy.
 */
export interface AppliedDomain {
	id: string;
	number: string;
	title: string;
	subtitle: string;
	blurb: string;
	accent: string;
	appIds: string[];
}

export const domains: AppliedDomain[] = [
	{
		id: "defense-aerospace",
		number: "01",
		title: "Defense & Aerospace",
		subtitle: "방위 시스템, 위성 통신, 항공우주 기술",
		blurb:
			"현대 국방은 정보의 속도가 곧 생존입니다. 전장의 모든 자산이 실시간으로 연결되고, 지휘관은 수천 개의 데이터 포인트에서 즉시 판단할 수 있어야 합니다.",
		accent: "var(--indigo-5)",
		appIds: [],
	},
	{
		id: "cybersecurity",
		number: "02",
		title: "Cybersecurity",
		subtitle: "위협 탐지, 암호화 기술, 보안 인프라",
		blurb:
			"사이버 위협은 더 이상 IT 부서만의 문제가 아닙니다. 산업 인프라 전체가 공격 표면이 된 시대에, 조직이 선제적으로 방어할 수 있는 체계를 구축합니다.",
		accent: "var(--blue-7)",
		appIds: [],
	},
	{
		id: "medical-technology",
		number: "03",
		title: "Medical Technology",
		subtitle: "의료 기기, 바이오센서, 임상 데이터 플랫폼",
		blurb:
			"의료 데이터는 환자의 생명과 직결됩니다. 단절된 검사 결과와 병원 간 데이터를 하나의 맥락으로 연결하는 임상 데이터 플랫폼을 구축합니다.",
		accent: "var(--green-7)",
		appIds: [],
	},
	{
		id: "mobility-logistics",
		number: "04",
		title: "Mobility & Logistics",
		subtitle: "자율주행, 실시간 추적, 물류 최적화",
		blurb:
			"사람과 물건의 이동은 모든 산업의 기반입니다. 차량이 어디에 있는지, 승객이 어디에서 기다리는지, 화물이 언제 도착하는지 — 이동의 모든 단계를 실시간으로 최적화합니다.",
		accent: "var(--amber-5)",
		appIds: ["amberstella"],
	},
	{
		id: "energy-materials",
		number: "05",
		title: "Energy & Materials",
		subtitle: "신재생 에너지, 배터리, 신소재 기술",
		blurb:
			"에너지 전환은 이 시대의 가장 큰 기술적 도전입니다. 발전량 예측과 계통 안정화, 배터리 관리로 신재생 에너지의 간헐성 문제를 실질적으로 해결합니다.",
		accent: "var(--amber-7)",
		appIds: [],
	},
	{
		id: "quantum-ai",
		number: "06",
		title: "Quantum & AI",
		subtitle: "양자 컴퓨팅, 고급 AI 연산, 차세대 알고리즘",
		blurb:
			"기존 컴퓨터로는 풀 수 없는 문제들이 있습니다. 양자 알고리즘과 산업 도메인에 특화된 AI로, 근본적으로 다른 접근이 필요한 영역을 다룹니다.",
		accent: "var(--indigo-7)",
		appIds: [],
	},
];
