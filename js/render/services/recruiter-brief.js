import { trackSelectContent } from '../../analytics/tracking.js';

export function createSectionRecruiterBrief(sectionConfig, options = {}) {
    const brief = sectionConfig?.recruiterBrief;
    if (!brief || typeof brief !== 'object') {
        return null;
    }

    const quickCases = Array.isArray(brief.cases)
        ? brief.cases
            .map((item) => ({
                id: String(item?.id || '').trim(),
                anchorId: String(item?.anchorId || '').trim(),
                title: String(item?.title || '').trim(),
                problem: String(item?.problem || '').trim(),
                action: String(item?.action || '').trim(),
                impact: String(item?.impact || '').trim()
            }))
            .filter((item) => item.id || item.title || item.problem || item.action || item.impact)
        : [];

    const bullets = Array.isArray(brief.bullets)
        ? brief.bullets.map((line) => String(line || '').trim()).filter(Boolean)
        : [];

    if (!brief.title && bullets.length === 0 && quickCases.length === 0) {
        return null;
    }

    const wrapper = document.createElement('section');
    wrapper.className = 'section-recruiter-brief';

    const kickerText = String(brief.kicker || '').trim();
    if (kickerText) {
        const kicker = document.createElement('p');
        kicker.className = 'section-recruiter-kicker';
        kicker.textContent = kickerText;
        wrapper.appendChild(kicker);
    }

    const titleText = String(brief.title || '').trim();
    if (titleText) {
        const title = document.createElement('h3');
        title.className = 'section-recruiter-title';
        title.textContent = titleText;
        wrapper.appendChild(title);
    }

    if (quickCases.length > 0) {
        const cardGrid = document.createElement('div');
        cardGrid.className = 'section-recruiter-card-grid';

        quickCases.forEach((item) => {
            const card = document.createElement('article');
            card.className = 'section-recruiter-card';
            if (item.anchorId) {
                card.id = `brief-${item.anchorId.replace(/^#/, '')}`;
            }

            const header = document.createElement('div');
            header.className = 'section-recruiter-card-header';
            header.style.cursor = 'pointer';

            const idLine = document.createElement('p');
            idLine.className = 'section-recruiter-card-id';
            idLine.textContent = item.id || 'Case';

            const cardTitle = document.createElement('h4');
            cardTitle.className = 'section-recruiter-card-title';
            cardTitle.textContent = item.title || '핵심 변화';

            header.append(idLine, cardTitle);

            const toggleHint = document.createElement('div');
            toggleHint.className = 'section-recruiter-card-toggle-hint';
            toggleHint.textContent = 'DETAILS';
            header.appendChild(toggleHint);

            const details = document.createElement('div');
            details.className = 'section-recruiter-card-details';

            const createRow = (labelText, valueText) => {
                if (!valueText) {
                    return null;
                }
                const row = document.createElement('div');
                row.className = 'section-recruiter-card-row';

                const key = document.createElement('span');
                key.className = 'section-recruiter-card-key';
                key.textContent = labelText;

                const val = document.createElement('span');
                val.className = 'section-recruiter-card-value';
                val.textContent = valueText;

                row.append(key, val);
                return row;
            };

            const problemRow = createRow('PROBLEM', item.problem);
            const actionRow = createRow('ACTION', item.action);
            const impactRow = createRow('IMPACT', item.impact);

            if (problemRow) {
                details.appendChild(problemRow);
            }
            if (actionRow) {
                details.appendChild(actionRow);
            }
            if (impactRow) {
                details.appendChild(impactRow);
            }

            if (item.anchorId) {
                const gotoBtn = document.createElement('button');
                gotoBtn.className = 'card-extra-btn';
                gotoBtn.textContent = 'GO_TO_FULL_PROBLEM_SOLVING';
                gotoBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const reveal = options.onRevealHashTarget;
                    if (typeof reveal === 'function') {
                        const targetId = item.anchorId.replace(/^#/, '');
                        reveal(targetId, 'recruiter_card_goto');
                    }
                });
                details.appendChild(gotoBtn);
            }

            card.append(header, details);

            card.addEventListener('click', () => {
                const isExpanded = card.classList.toggle('is-expanded');
                trackSelectContent({
                    contentType: 'recruiter_quick_brief_card',
                    itemId: item.id || 'unknown_case',
                    itemName: item.title || 'unknown_case',
                    sectionName: 'recruiter_quick_brief',
                    interactionAction: isExpanded ? 'expand' : 'collapse',
                    elementType: 'article',
                    elementLabel: item.id || 'unknown_case'
                });
            });

            cardGrid.appendChild(card);
        });

        wrapper.appendChild(cardGrid);
    }

    if (bullets.length > 0 && quickCases.length === 0) {
        const list = document.createElement('ul');
        list.className = 'section-recruiter-list';
        bullets.forEach((line) => {
            const item = document.createElement('li');
            item.textContent = line;
            list.appendChild(item);
        });
        wrapper.appendChild(list);
    }

    const actions = document.createElement('div');
    actions.className = 'section-recruiter-actions';
    wrapper.appendChild(actions);

    return wrapper;
}
