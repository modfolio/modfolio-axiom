import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { dispatchAccent, dispatchArticles, dispatchSource } from "~/data/dispatch";

/**
 * "Axiom Dispatch" — the portal's editorial feed, syndicated from Modfolio
 * Press. Data-driven from `~/data/dispatch`, mirroring `DomainGrid` /
 * `DomainCard`: the typed source is the single source of truth, and the
 * per-entry count drives whether the populated grid or the empty state
 * renders.
 *
 * The feed is currently empty (no published Press article-feed contract —
 * see `~/data/dispatch`), so the section renders a real, typed empty state
 * — consistent with `DomainCard`'s empty state — instead of the fabricated
 * "Article placeholder / Awaiting publication" rows it replaces. When the
 * contract ships and `dispatchArticles` is populated, the same component
 * renders the entries with no further change.
 */
export const AxiomDispatch = component$(() => {
	useStylesScoped$(`
		.news {
			margin-bottom: var(--space-8);
		}

		.news__header {
			display: flex;
			align-items: baseline;
			gap: var(--space-3);
			margin-bottom: var(--section-gap);
		}

		.news__label {
			font-family: var(--font-ui);
			font-size: var(--section-label-size);
			font-weight: var(--section-label-weight);
			text-transform: uppercase;
			letter-spacing: var(--section-label-tracking);
			color: var(--section-label-color);
		}

		.news__source {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			letter-spacing: var(--tracking-label);
		}

		.news__count {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			height: var(--size-badge);
			padding: 0 var(--space-2);
			font-family: var(--font-code);
			font-size: var(--text-xs);
			font-weight: 600;
			letter-spacing: var(--tracking-label);
			color: var(--color-interactive-primary);
			background: var(--color-interactive-muted);
			border-radius: var(--radius-1);
		}

		/* ── Populated grid ── */
		.news__grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(18.75rem, 1fr));
			gap: var(--space-4);
		}

		.news__item {
			display: flex;
			flex-direction: column;
			gap: var(--space-2);
			background: var(--card-bg);
			border: var(--card-border);
			border-radius: var(--card-radius);
			border-left: 2px solid var(--dispatch-accent);
			padding: var(--card-padding);
			transition: transform var(--dur-fast) var(--ease-out),
				box-shadow var(--dur-fast) var(--ease-out),
				border-color var(--dur-fast) var(--ease-out);
		}

		.news__item:hover {
			transform: translateY(calc(var(--space-1) * -1));
			box-shadow: var(--shadow-2);
			border-color: var(--color-border-hover);
			border-left-color: var(--dispatch-accent);
		}

		.news__item:focus-within {
			border-color: var(--color-border-hover);
			border-left-color: var(--dispatch-accent);
		}

		.news__item-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: var(--space-2);
		}

		.news__category {
			display: inline-flex;
			align-items: center;
			gap: var(--space-1);
			font-family: var(--font-code);
			font-size: var(--text-xs);
			text-transform: uppercase;
			letter-spacing: var(--tracking-label);
			color: var(--color-text-secondary);
		}

		.news__category-dot {
			width: var(--size-status-dot);
			height: var(--size-status-dot);
			border-radius: 50%;
			background: var(--dispatch-accent);
			flex-shrink: 0;
		}

		.news__date {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-text-tertiary);
			letter-spacing: var(--tracking-label);
		}

		.news__item-title {
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--color-text-primary);
			letter-spacing: var(--tracking-tight);
			text-decoration: none;
		}

		.news__item-link:focus-visible {
			outline: 2px solid var(--color-interactive-primary);
			outline-offset: 2px;
			border-radius: var(--radius-1);
		}

		.news__item-link:hover .news__item-title {
			color: var(--color-interactive-primary);
		}

		.news__item-summary {
			font-family: var(--font-body);
			font-size: var(--text-sm);
			color: var(--color-text-secondary);
			line-height: var(--leading-normal);
		}

		/* ── Empty state (mirrors DomainCard's empty state) ── */
		.news__empty {
			display: flex;
			align-items: flex-start;
			gap: var(--space-3);
			background: var(--card-bg);
			border: var(--card-border);
			border-radius: var(--card-radius);
			padding: var(--card-padding);
		}

		.news__empty-mark {
			font-family: var(--font-code);
			font-size: var(--text-xl);
			line-height: 1;
			color: var(--color-text-tertiary);
			opacity: 0.6;
			flex-shrink: 0;
			user-select: none;
		}

		.news__empty-content {
			display: flex;
			flex-direction: column;
			gap: var(--space-1);
		}

		.news__empty-title {
			font-family: var(--font-ui);
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--color-text-secondary);
			letter-spacing: var(--tracking-tight);
		}

		.news__empty-desc {
			font-family: var(--font-body);
			font-size: var(--text-sm);
			color: var(--color-text-tertiary);
			line-height: var(--leading-normal);
		}

		.news__empty-link {
			font-family: var(--font-code);
			font-size: var(--text-xs);
			color: var(--color-interactive-primary);
			letter-spacing: var(--tracking-label);
			text-decoration: none;
			width: fit-content;
		}

		.news__empty-link:hover {
			text-decoration: underline;
		}

		.news__empty-link:focus-visible {
			outline: 2px solid var(--color-interactive-primary);
			outline-offset: 2px;
			border-radius: var(--radius-1);
		}

		@media (prefers-reduced-motion: reduce) {
			.news__item {
				transition: none;
			}
		}
	`);

	const count = dispatchArticles.length;
	const hasArticles = count > 0;

	return (
		<section class="news" aria-label="Axiom Dispatch">
			<div class="news__header">
				<span class="news__label">{dispatchSource.label}</span>
				<span class="news__source">{dispatchSource.via}</span>
				{hasArticles ? <span class="news__count">{count}</span> : null}
			</div>

			{hasArticles ? (
				<div class="news__grid">
					{dispatchArticles.map((article) => (
						<a
							key={article.id}
							href={article.url}
							class="news__item news__item-link"
							style={{ "--dispatch-accent": dispatchAccent[article.category] }}
							target="_blank"
							rel="noopener"
						>
							<span class="news__item-top">
								<span class="news__category">
									<span class="news__category-dot" aria-hidden="true" />
									{article.category}
								</span>
								<time class="news__date" dateTime={article.publishedAt}>
									{article.publishedAt}
								</time>
							</span>
							<span class="news__item-title">{article.title}</span>
							<span class="news__item-summary">{article.summary}</span>
						</a>
					))}
				</div>
			) : (
				<div class="news__empty">
					<span class="news__empty-mark" aria-hidden="true">
						{"—"}
					</span>
					<div class="news__empty-content">
						<span class="news__empty-title">발행된 소식이 아직 없습니다</span>
						<p class="news__empty-desc">
							Axiom Dispatch는 Modfolio Press의 발행 피드와 연동됩니다. 소비 가능한 피드 계약이
							준비되면 이곳에 최신 글이 표시됩니다.
						</p>
						<a
							href={dispatchSource.feedUrl}
							class="news__empty-link"
							target="_blank"
							rel="noopener"
						>
							{"Modfolio Press →"}
						</a>
					</div>
				</div>
			)}
		</section>
	);
});
