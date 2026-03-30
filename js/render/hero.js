import { byId, setText } from '../utils/dom.js';
import { setYouTubeDataAttribute } from '../utils/youtube.js';

function renderMetricLines(container, lines, fallbackText) {
    const metricLines = Array.isArray(lines) ? lines : [];
    if (metricLines.length === 0) {
        const fallback = document.createElement('p');
        fallback.textContent = fallbackText;
        container.appendChild(fallback);
        return;
    }

    metricLines.forEach((line) => {
        const item = document.createElement('p');
        const cleanLine = String(line).replace(/^>\s*/, '');
        item.textContent = `> ${cleanLine}`;
        container.appendChild(item);
    });
}

function renderHeroProfileSummary(container, lines) {
    const summaryLines = Array.isArray(lines)
        ? lines.map((line) => String(line).trim()).filter(Boolean)
        : [];

    if (summaryLines.length === 0) {
        return false;
    }

    const list = document.createElement('ul');
    list.className = 'hero-profile-summary';

    summaryLines.forEach((line) => {
        const item = document.createElement('li');
        item.textContent = line;
        list.appendChild(item);
    });

    container.append(list);
    return true;
}

function renderHeroStatCards(container, statCards) {
    const cards = Array.isArray(statCards) ? statCards.filter((item) => item && (item.label || item.value)) : [];
    if (cards.length === 0) {
        return false;
    }

    const grid = document.createElement('div');
    grid.className = 'hero-stat-grid';

    cards.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'hero-stat-card';

        const label = document.createElement('p');
        label.className = 'hero-stat-label';
        label.textContent = item.label ?? '';

        const value = document.createElement('p');
        value.className = 'hero-stat-value';
        value.textContent = item.value ?? '';

        card.append(label, value);

        if (item.delta) {
            const delta = document.createElement('p');
            delta.className = 'hero-stat-delta';
            delta.textContent = item.delta;
            card.append(delta);
        }

        grid.append(card);
    });

    container.append(grid);
    return true;
}

function renderHeroQuickLinks(container, quickLinks) {
    const links = Array.isArray(quickLinks) ? quickLinks.filter((item) => item?.href) : [];
    if (links.length === 0) {
        return false;
    }

    const row = document.createElement('div');
    row.className = 'hero-quick-links';

    links.forEach((item) => {
        const link = document.createElement('a');
        link.className = 'hero-quick-link';

        const variant = String(item.variant ?? '').trim().toLowerCase();
        if (variant) {
            link.classList.add(`is-${variant}`);
        }

        link.href = item.href;
        link.textContent = item.label ?? 'LINK';

        if (!String(item.href).startsWith('#') && !String(item.href).startsWith('mailto:')) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }

        row.append(link);
    });

    container.append(row);
    return true;
}

export function renderHero(templateConfig) {
    const hero = templateConfig.hero ?? {};
    const section = byId('system-architecture');
    const metrics = byId('hero-metrics');
    const mermaidContainer = byId('hero-mermaid');
    const graphContainer = mermaidContainer?.closest('.graph-container') ?? null;

    if (section && hero.sectionId) {
        section.id = hero.sectionId;
    }
    setText('hero-panel-title', hero.panelTitle);
    setText('hero-panel-uid', hero.panelUid);

    if (mermaidContainer && hero.diagramId) {
        mermaidContainer.setAttribute('data-mermaid-id', hero.diagramId);
    }
    setYouTubeDataAttribute(graphContainer, hero);

    if (section && graphContainer) {
        let visualStack = section.querySelector('.hero-visual-stack');
        if (!(visualStack instanceof HTMLElement)) {
            visualStack = document.createElement('div');
            visualStack.className = 'hero-visual-stack';
            graphContainer.before(visualStack);
        }

        if (graphContainer.parentElement !== visualStack) {
            visualStack.prepend(graphContainer);
        }

        let noteList = visualStack.querySelector('.hero-diagram-notes');
        if (!(noteList instanceof HTMLUListElement)) {
            noteList = document.createElement('ul');
            noteList.className = 'hero-diagram-notes';
            visualStack.appendChild(noteList);
        }

        noteList.replaceChildren();
        const noteLines = Array.isArray(hero.diagramNotes) && hero.diagramNotes.length > 0
            ? hero.diagramNotes
            : ['Add notes in templateConfig.hero.diagramNotes'];
        noteLines.forEach((line) => {
            const item = document.createElement('li');
            item.textContent = String(line).replace(/^>\s*/, '');
            noteList.appendChild(item);
        });
    }

    if (!metrics) {
        return;
    }
    metrics.replaceChildren();

    const intro = typeof hero.intro === 'string' ? hero.intro.trim() : '';
    if (intro) {
        const introLine = document.createElement('p');
        introLine.className = 'hero-intro';
        introLine.textContent = intro;
        metrics.append(introLine);
    }

    const hasProfileSummary = renderHeroProfileSummary(metrics, hero.profileSummaryLines);
    const hasStatCards = renderHeroStatCards(metrics, hero.statCards);
    const hasQuickLinks = renderHeroQuickLinks(metrics, hero.quickLinks);

    if (typeof hero.statNote === 'string' && hero.statNote.trim()) {
        const note = document.createElement('p');
        note.className = 'hero-stat-note';
        note.textContent = hero.statNote.trim();
        metrics.append(note);
    }

    if (!intro && !hasProfileSummary && !hasStatCards && !hasQuickLinks) {
        renderMetricLines(metrics, hero.metrics, '> Add metrics in templateConfig.hero.metrics');
    }
}

function createTopPanel(panel, index) {
    const section = document.createElement('section');
    section.className = `panel hero-panel ${panel.panelClass ?? ''}`.trim();
    section.id = panel.sectionId || `top-panel-${index + 1}`;

    const header = document.createElement('div');
    header.className = 'panel-header';

    const title = document.createElement('span');
    title.className = 'panel-title';
    title.textContent = panel.panelTitle || `TOP_PANEL_${index + 1}`;

    const uid = document.createElement('span');
    uid.className = 'panel-uid';
    uid.textContent = panel.panelUid || `ID: TOP-${String(index + 1).padStart(2, '0')}`;

    header.append(title, uid);

    const graphContainer = document.createElement('div');
    graphContainer.className = 'graph-container';
    const mermaidContainer = document.createElement('div');
    mermaidContainer.className = 'mermaid';
    mermaidContainer.setAttribute('data-mermaid-id', panel.diagramId || '');
    graphContainer.appendChild(mermaidContainer);
    setYouTubeDataAttribute(graphContainer, panel);

    const metrics = document.createElement('div');
    metrics.className = 'hero-message';
    renderMetricLines(metrics, panel.metrics, '> Add metrics in templateConfig.topPanels');

    section.append(header, graphContainer, metrics);
    return section;
}

export function renderTopPanels(templateConfig) {
    const container = byId('top-panels');
    if (!container) {
        return;
    }
    container.replaceChildren();

    const panels = Array.isArray(templateConfig.topPanels) ? templateConfig.topPanels : [];
    panels.forEach((panel, index) => {
        container.appendChild(createTopPanel(panel, index));
    });
}
