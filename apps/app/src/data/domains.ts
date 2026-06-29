/**
 * Applied-technology domain taxonomy for the Axiom portal.
 *
 * Canonical source: knowledge/projects/axiom-landing-content.md
 * (the repo's own content map — the six domains, their numbers, English
 * titles, Korean subtitles, Overview paragraphs, and Capabilities are
 * reproduced verbatim from that document). The landing site renders the
 * same six domains; the authenticated portal surfaces them as a discovery
 * section so a logged-in user sees the full taxonomy, not just the app grid.
 *
 * `blurb` is the grid teaser (the Overview's opening line). `overview`
 * holds the full three-paragraph Overview and `capabilities` the four-item
 * Capabilities table — both revealed by the in-card disclosure in
 * `DomainCard`, so the portal surfaces the same depth as each domain's
 * dedicated landing page.
 *
 * `appIds` links each domain to entries in `~/data/apps` by their `id`.
 * The per-domain app count shown in the portal is derived from `apps`
 * (the registry is the source of truth), so a domain with no registered
 * app renders a real empty state rather than fabricated "coming soon" copy.
 */
export interface DomainCapability {
	title: string;
	description: string;
}

export interface AppliedDomain {
	id: string;
	number: string;
	title: string;
	subtitle: string;
	/** Grid teaser — the opening line of the domain's Overview. */
	blurb: string;
	/** Full Overview, three paragraphs, verbatim from the content map. */
	overview: string[];
	/** Four-item Capabilities table, verbatim from the content map. */
	capabilities: DomainCapability[];
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
		overview: [
			"현대 국방은 정보의 속도가 곧 생존입니다. 전장의 모든 자산 — 지상 장비, 항공기, 위성 — 이 실시간으로 연결되어야 하며, 지휘관은 수천 개의 데이터 포인트에서 의미 있는 판단을 즉시 내릴 수 있어야 합니다. Axiom은 이 복잡한 상황 인식 문제를 통합 플랫폼으로 해결합니다.",
			"위성 통신 분야에서는 저궤도 위성군의 데이터 중계, 지상국 네트워크 최적화, 그리고 통신 두절 상황에서의 자율 복구 프로토콜을 다룹니다. 단일 위성이 아닌 위성군 전체를 하나의 통신 인프라로 운용하는 기술은 민간 영역으로의 확장 가능성까지 품고 있습니다.",
			"무인 시스템의 관제와 항공우주 데이터 분석은 Axiom이 집중하는 또 다른 축입니다. 드론 편대의 자율 임무 수행, 발사체 텔레메트리의 실시간 해석, 궤도 잔해 추적과 충돌 회피 — 이 모든 것은 밀리초 단위의 정확성과 절대적인 신뢰성을 요구하며, 바로 그 기준이 Axiom의 출발점입니다.",
		],
		capabilities: [
			{
				title: "상황 인식 시스템",
				description:
					"다중 센서 데이터를 통합하여 전장 상황을 실시간으로 시각화하고, 위협을 자동 분류·우선순위화하는 통합 지휘 플랫폼을 구축합니다.",
			},
			{
				title: "위성 통신 플랫폼",
				description:
					"저궤도 위성군 기반의 고속 데이터 중계, 지상국 네트워크 자동 전환, 통신 두절 시 자율 복구 프로토콜을 제공합니다.",
			},
			{
				title: "무인 시스템 관제",
				description:
					"드론 편대의 자율 경로 계획과 임무 할당, 실시간 영상 분석, 그리고 다수 무인체 간 협업 관제 시스템을 운용합니다.",
			},
			{
				title: "항공우주 데이터 분석",
				description:
					"발사체 텔레메트리 해석, 궤도 잔해 추적, 위성 상태 모니터링 등 항공우주 영역의 대규모 데이터를 처리하고 의사결정에 활용합니다.",
			},
		],
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
		overview: [
			"사이버 위협은 더 이상 IT 부서만의 문제가 아닙니다. 제조 설비의 운영 기술(OT), 의료 기기 네트워크, 에너지 그리드 — 산업 인프라 전체가 공격 표면이 된 시대입니다. Axiom은 이 확장된 위협 환경에서 조직이 선제적으로 방어할 수 있는 체계를 구축합니다.",
			"제로 트러스트는 단순한 네트워크 정책이 아니라 조직 전체의 보안 철학입니다. 모든 접근 요청을 검증하고, 최소 권한 원칙을 자동 적용하며, 이상 행위를 실시간으로 탐지합니다. Axiom의 보안 플랫폼은 이 원칙을 사용자 인증부터 데이터 암호화, 네트워크 세그먼트까지 일관되게 적용합니다.",
			"보안 감사와 컴플라이언스는 규제 대응을 넘어 조직의 보안 성숙도를 높이는 과정입니다. 취약점을 발견하고, 패치 우선순위를 산정하고, 개선 효과를 정량적으로 측정하는 순환 체계를 통해 보안은 일회성 프로젝트가 아닌 지속적인 역량이 됩니다.",
		],
		capabilities: [
			{
				title: "위협 탐지 · 대응",
				description:
					"네트워크 트래픽과 엔드포인트 행위를 실시간 분석하여 알려진 위협과 제로데이 공격을 조기에 탐지하고, 자동 격리·대응 프로세스를 실행합니다.",
			},
			{
				title: "암호화 · 데이터 보호",
				description:
					"전송 중·저장 중 데이터의 엔드투엔드 암호화, 키 관리 자동화, 그리고 양자 내성 암호 알고리즘 전환을 위한 로드맵을 제공합니다.",
			},
			{
				title: "보안 감사 · 컴플라이언스",
				description:
					"ISMS, ISO 27001, GDPR 등 규제 요건에 맞춘 자동 감사 체계를 운영하고, 보안 성숙도를 정량적으로 평가·개선합니다.",
			},
			{
				title: "취약점 분석 · 패치",
				description:
					"인프라와 애플리케이션의 취약점을 지속적으로 스캔하고, 위험도 기반 우선순위에 따라 패치를 자동 배포하여 공격 표면을 최소화합니다.",
			},
		],
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
		overview: [
			"의료 데이터는 환자의 생명과 직결됩니다. 하지만 현실에서는 검사 결과가 종이에 머물고, 병원 간 데이터가 단절되며, 환자 본인조차 자신의 건강 기록을 통합적으로 볼 수 없는 경우가 대부분입니다. Axiom은 이 단절을 해소하는 임상 데이터 플랫폼을 구축합니다. 진단, 처방, 검사, 모니터링 데이터가 하나의 맥락 안에서 연결될 때 비로소 의료진은 정확한 판단을 내릴 수 있습니다.",
			"바이오센서 기술은 의료의 범위를 병원 밖으로 확장합니다. 연속 혈당 모니터링, 심전도 패치, 산소 포화도 측정 — 이런 센서들이 생성하는 연속 데이터를 수집하고 분석하여 이상 징후를 조기에 포착합니다. 응급 상황이 발생하기 전에 경고를 보내고, 만성 질환의 악화를 사전에 예방하는 것이 목표입니다.",
			"원격 진료는 지리적 한계를 넘어 의료 접근성을 높이는 핵심 수단입니다. Axiom은 고화질 영상 상담, 실시간 바이탈 공유, 전자 처방 연동을 하나의 흐름으로 통합하여 원격 진료가 대면 진료에 준하는 품질을 갖추도록 합니다.",
		],
		capabilities: [
			{
				title: "임상 데이터 플랫폼",
				description:
					"진단, 처방, 검사, 영상 데이터를 통합 관리하고 병원 간 안전한 데이터 교환을 지원하여 의료진의 의사결정 품질을 높입니다.",
			},
			{
				title: "바이오센서 통합",
				description:
					"연속 측정 센서의 데이터를 실시간 수집·분석하여 이상 징후를 조기에 포착하고, 만성 질환 관리와 응급 상황 예방에 활용합니다.",
			},
			{
				title: "원격 진료 인프라",
				description:
					"고화질 영상 상담, 실시간 바이탈 사인 공유, 전자 처방 연동을 통합하여 지리적 제약 없이 양질의 진료를 제공합니다.",
			},
			{
				title: "환자 모니터링",
				description:
					"입원 환자의 실시간 상태 감시부터 퇴원 후 원격 추적까지, 환자 여정 전체에 걸친 연속 모니터링 체계를 구축합니다.",
			},
		],
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
		overview: [
			"사람과 물건의 이동은 모든 산업의 기반입니다. 하지만 대부분의 이동은 여전히 비효율적입니다 — 빈 좌석으로 달리는 셔틀, 겹치는 배송 경로, 수요를 예측하지 못하는 배차. Axiom은 이동의 모든 단계를 데이터로 연결하고 실시간으로 최적화합니다. 차량이 어디에 있는지, 승객이 어디에서 기다리는지, 화물이 언제 도착하는지 — 이 모든 정보가 하나의 시스템 안에서 흐릅니다.",
			"Amberstella는 Axiom의 첫 번째 모빌리티 서비스입니다. 셔틀 위치를 실시간으로 추적하고, 탑승자에게 정확한 도착 시간을 알려주며, 운행 데이터를 분석하여 노선과 배차를 지속적으로 개선합니다. 단순한 위치 표시가 아니라 탑승 경험 전체를 설계하는 것이 Amberstella의 접근 방식입니다.",
			"물류 영역에서는 라스트마일 배송의 경로 최적화, 창고 입출고의 자동화, 수요 예측 기반의 재고 배치를 다룹니다. 이동 수단이 자율주행으로 전환되는 미래를 준비하면서도, 오늘의 운영 효율을 즉시 개선하는 실용적 솔루션을 먼저 제공합니다.",
		],
		capabilities: [
			{
				title: "실시간 위치 추적",
				description:
					"차량, 화물, 인력의 위치를 초 단위로 추적하고, 지연·이탈·사고를 즉시 감지하여 관제 센터와 사용자 모두에게 알립니다.",
			},
			{
				title: "경로 · 배차 최적화",
				description:
					"교통 상황, 수요 패턴, 차량 상태를 종합 분석하여 최적 경로를 산출하고, 유휴 차량을 최소화하는 배차 알고리즘을 운영합니다.",
			},
			{
				title: "탑승 관리 시스템",
				description:
					"예약, 탑승, 하차의 전체 흐름을 디지털화하고, 탑승자에게 정확한 도착 예상 시간과 좌석 현황을 실시간으로 제공합니다.",
			},
			{
				title: "물류 자동화",
				description:
					"창고 입출고 프로세스 자동화, 라스트마일 배송 최적화, 수요 예측 기반 재고 배치로 물류 비용을 절감하고 배송 속도를 높입니다.",
			},
		],
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
		overview: [
			"에너지 전환은 이 시대의 가장 큰 기술적 도전입니다. 태양광과 풍력은 날씨에 따라 출력이 급변하고, 에너지 저장 기술은 아직 수요를 완전히 감당하지 못하며, 전력 그리드는 분산 발전원의 급증에 적응해야 합니다. Axiom은 이 불확실성을 데이터와 예측으로 관리합니다. 발전량 예측, 계통 안정화, 수요 반응 최적화를 통해 신재생 에너지의 간헐성 문제를 실질적으로 해결합니다.",
			"배터리는 에너지 전환의 핵심 병목입니다. 전기차, 에너지 저장 시스템(ESS), 가정용 축전지 — 모두 배터리의 성능과 수명에 의존합니다. Axiom의 배터리 관리 시스템은 셀 단위의 상태 모니터링, 열화 예측, 충방전 최적화를 통해 배터리의 실사용 수명을 극대화하고 안전 사고를 예방합니다.",
			"신소재 분야에서는 실험 데이터의 체계적 관리와 분석이 핵심입니다. 수만 건의 합성 조건과 물성 데이터를 구조화하고, 패턴을 발견하며, 다음 실험의 방향을 제시합니다. 시행착오의 횟수를 줄이고 소재 개발 주기를 단축하는 것 — 이것이 데이터가 소재 과학에 기여하는 방식입니다.",
		],
		capabilities: [
			{
				title: "에너지 모니터링",
				description:
					"태양광·풍력 발전소의 실시간 출력 감시, 발전량 예측, 계통 연계 상태 모니터링을 통해 신재생 에너지 자산의 가동률을 극대화합니다.",
			},
			{
				title: "배터리 관리 시스템",
				description:
					"셀 단위 상태 모니터링, 열화 예측 알고리즘, 충방전 최적화로 배터리 수명을 연장하고 열폭주 등 안전 사고를 사전에 방지합니다.",
			},
			{
				title: "신소재 데이터 분석",
				description:
					"합성 조건, 물성 측정, 성능 시험 데이터를 구조화하고 패턴을 분석하여 소재 개발 주기를 단축하고 실험 효율을 높입니다.",
			},
			{
				title: "에너지 효율 최적화",
				description:
					"건물, 공장, 데이터센터의 에너지 소비 패턴을 분석하고 자동 제어를 통해 비용을 절감하면서 탄소 배출을 줄입니다.",
			},
		],
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
		overview: [
			"기존 컴퓨터로는 풀 수 없는 문제들이 있습니다. 수백 개 변수의 동시 최적화, 분자 구조 시뮬레이션, 대규모 조합 문제 — 이런 영역에서 양자 컴퓨팅은 근본적으로 다른 접근을 가능하게 합니다. Axiom은 양자 알고리즘을 연구하고, 현실 문제에 적용 가능한 수준으로 발전시키는 데 집중합니다. 아직 범용 양자 컴퓨터의 시대는 오지 않았지만, 특정 문제에서의 양자 우위는 이미 현실이 되고 있습니다.",
			"AI 분야에서는 대규모 언어 모델의 산업 응용, 강화 학습 기반의 의사결정 최적화, 그리고 멀티모달 AI의 실용화를 추진합니다. 핵심은 모델 자체의 크기가 아니라 특정 산업 도메인에서의 정확성과 효율입니다. 방위, 의료, 에너지 등 Axiom의 다른 도메인에서 발생하는 실제 문제를 AI로 해결하는 것이 우리의 접근 방식입니다.",
			"양자와 AI의 교차점에서 가장 주목할 영역은 차세대 암호화입니다. 양자 컴퓨터가 현재의 암호 체계를 위협하는 미래에 대비하여 양자 내성 암호 알고리즘을 개발하고, 기존 시스템의 전환 경로를 설계합니다. 보안은 위협이 현실화된 후가 아니라 그 전에 준비해야 합니다.",
		],
		capabilities: [
			{
				title: "양자 알고리즘 개발",
				description:
					"조합 최적화, 분자 시뮬레이션, 암호 분석 등 양자 우위가 입증된 영역에서 실용적 알고리즘을 연구하고 구현합니다.",
			},
			{
				title: "AI 모델 최적화",
				description:
					"대규모 언어 모델의 산업별 파인튜닝, 추론 속도 최적화, 멀티모달 처리를 통해 실제 업무에 즉시 적용 가능한 AI 솔루션을 제공합니다.",
			},
			{
				title: "대규모 연산 인프라",
				description:
					"GPU 클러스터 관리, 분산 학습 파이프라인, 모델 서빙 최적화를 통해 대규모 AI 워크로드를 안정적이고 비용 효율적으로 운영합니다.",
			},
			{
				title: "차세대 암호화",
				description:
					"양자 내성 암호 알고리즘 연구, 기존 암호 시스템의 전환 로드맵 수립, 포스트 양자 보안 체계 구축으로 미래 위협에 선제 대응합니다.",
			},
		],
		accent: "var(--indigo-7)",
		appIds: [],
	},
];
