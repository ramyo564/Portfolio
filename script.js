import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
import { templateConfig } from './config.js';

const baseMermaidConfig = {
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'linear'
    }
};

const mermaidConfig = {
    ...baseMermaidConfig,
    ...(templateConfig.mermaid ?? {}),
    flowchart: {
        ...baseMermaidConfig.flowchart,
        ...(templateConfig.mermaid?.flowchart ?? {})
    }
};

mermaid.initialize(mermaidConfig);

function byId(id) {
    return document.getElementById(id);
}

function normalizeHashTarget(target) {
    if (!target) {
        return '#';
    }
    return target.startsWith('#') ? target : `#${target}`;
}

function toSafeLabel(value) {
    return String(value ?? 'unknown').replace(/[^a-zA-Z0-9_-]+/g, ' ').trim() || 'unknown';
}

function extractYouTubeVideoId(urlOrId) {
    const rawValue = String(urlOrId ?? '').trim();
    if (!rawValue) {
        return '';
    }

    const videoIdPattern = /^[a-zA-Z0-9_-]{11}$/;
    if (videoIdPattern.test(rawValue)) {
        return rawValue;
    }

    let parsedUrl;
    try {
        parsedUrl = new URL(rawValue);
    } catch {
        return '';
    }

    const host = parsedUrl.hostname.toLowerCase();
    if (host === 'youtu.be') {
        const shortId = parsedUrl.pathname.split('/').filter(Boolean)[0] ?? '';
        return videoIdPattern.test(shortId) ? shortId : '';
    }

    if (host.includes('youtube.com') || host.includes('youtube-nocookie.com')) {
        const watchId = parsedUrl.searchParams.get('v') ?? '';
        if (videoIdPattern.test(watchId)) {
            return watchId;
        }

        const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
        const knownMarkers = ['embed', 'shorts', 'live', 'v'];
        const markerIndex = pathSegments.findIndex((segment) => knownMarkers.includes(segment));
        if (markerIndex >= 0) {
            const candidate = pathSegments[markerIndex + 1] ?? '';
            if (videoIdPattern.test(candidate)) {
                return candidate;
            }
        }

        const lastSegment = pathSegments[pathSegments.length - 1] ?? '';
        if (videoIdPattern.test(lastSegment)) {
            return lastSegment;
        }
    }

    return '';
}

function resolveYouTubeVideoId(source) {
    if (!source || typeof source !== 'object') {
        return '';
    }

    const candidates = [];
    if (source.youtubeId) {
        candidates.push(source.youtubeId);
    }
    if (source.youtubeUrl) {
        candidates.push(source.youtubeUrl);
    }

    const links = Array.isArray(source.links) ? source.links : [];
    links.forEach((item) => {
        if (item?.href) {
            candidates.push(item.href);
        }
    });

    for (let index = 0; index < candidates.length; index += 1) {
        const videoId = extractYouTubeVideoId(candidates[index]);
        if (videoId) {
            return videoId;
        }
    }

    return '';
}

function setYouTubeDataAttribute(target, source) {
    if (!(target instanceof HTMLElement)) {
        return;
    }
    const videoId = resolveYouTubeVideoId(source);
    if (videoId) {
        target.setAttribute('data-youtube-video-id', videoId);
        return;
    }
    target.removeAttribute('data-youtube-video-id');
}

function buildYouTubeEmbedUrl(videoId, options = {}) {
    const autoplay = options.autoplay ? '1' : '0';
    const mute = options.mute ? '1' : '0';
    const controls = options.controls === false ? '0' : '1';
    const loop = options.loop ? '1' : '0';
    const playlist = loop === '1' ? `&playlist=${encodeURIComponent(videoId)}` : '';

    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=${autoplay}&mute=${mute}&controls=${controls}&rel=0&modestbranding=1&playsinline=1&loop=${loop}${playlist}`;
}

function setText(id, value) {
    const el = byId(id);
    if (el && value) {
        el.textContent = value;
    }
}

function setupUptime() {
    const uptimeElement = byId('uptime');
    if (!uptimeElement) {
        return;
    }

    const startTime = new Date();
    const updateUptime = () => {
        const now = new Date();
        const diff = Math.floor((now - startTime) / 1000);
        const h = Math.floor(diff / 3600).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
        const s = (diff % 60).toString().padStart(2, '0');
        uptimeElement.textContent = `${h}:${m}:${s}`;
    };

    updateUptime();
    setInterval(updateUptime, 1000);
}

function setupMobileNav() {
    const nav = byId('header-nav');
    const toggle = document.querySelector('.nav-toggle');
    if (!nav || !toggle) {
        return;
    }

    const closeNav = () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    const openNav = () => {
        nav.classList.add('is-open');
        toggle.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        if (nav.classList.contains('is-open')) {
            closeNav();
        } else {
            openNav();
        }
    });

    nav.addEventListener('click', (event) => {
        const target = event.target;
        if (
            target instanceof HTMLElement &&
            (target.classList.contains('nav-item') || target.classList.contains('nav-sub-item'))
        ) {
            closeNav();
        }
    });

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Node)) {
            return;
        }
        if (!nav.contains(target) && !toggle.contains(target)) {
            closeNav();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNav();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeNav();
        }
    });
}

function setSystemInfo() {
    if (templateConfig.system?.documentTitle) {
        document.title = templateConfig.system.documentTitle;
    }
    setText('system-name', templateConfig.system?.systemName);
}

function renderHero() {
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
    renderMetricLines(metrics, hero.metrics, '> Add metrics in templateConfig.hero.metrics');
}

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

function renderTopPanels() {
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

function renderSkills() {
    const skillsConfig = templateConfig.skills ?? {};
    const section = byId('skill-set');
    const grid = byId('skill-grid');
    if (!grid) {
        return;
    }

    if (section && skillsConfig.sectionId) {
        section.id = skillsConfig.sectionId;
    }
    setText('skills-panel-title', skillsConfig.panelTitle);
    setText('skills-panel-uid', skillsConfig.panelUid);

    grid.replaceChildren();
    const items = Array.isArray(skillsConfig.items) ? skillsConfig.items : [];

    items.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'skill-card';

        const title = document.createElement('h3');
        title.className = 'skill-card-title';
        title.textContent = item.title ?? 'CATEGORY';

        const stack = document.createElement('p');
        stack.className = 'skill-card-stack';
        stack.textContent = item.stack ?? '';

        card.append(title, stack);
        grid.appendChild(card);
    });
}

function createGroupDivider(group, sectionTheme) {
    const divider = document.createElement('div');
    divider.className = 'group-divider';
    divider.setAttribute('data-theme', sectionTheme || 'blue');

    const title = document.createElement('span');
    title.className = 'group-title';
    title.textContent = group.title ?? '';

    const desc = document.createElement('span');
    desc.className = 'group-desc';
    desc.textContent = group.desc ?? '';

    divider.append(title, desc);
    return divider;
}

function createMetaLine(label, value) {
    if (!value) {
        return null;
    }

    const line = document.createElement('p');
    line.className = 'card-meta-line';

    const key = document.createElement('span');
    key.className = 'meta-label';
    key.textContent = `${label}:`;

    const text = document.createElement('span');
    text.className = 'meta-value';
    text.textContent = value;

    line.append(key, text);
    return line;
}

function createTagList(tags) {
    const normalizedTags = Array.isArray(tags) ? tags.filter(Boolean) : [];
    if (normalizedTags.length === 0) {
        return null;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'card-tags';

    normalizedTags.forEach((tag) => {
        const item = document.createElement('span');
        item.className = 'card-tag';
        item.textContent = tag;
        wrapper.appendChild(item);
    });

    return wrapper;
}

function createHighlightList(items) {
    const normalizedItems = Array.isArray(items) ? items.filter(Boolean) : [];
    if (normalizedItems.length === 0) {
        return null;
    }

    const list = document.createElement('ul');
    list.className = 'card-highlights';
    normalizedItems.forEach((item) => {
        const line = document.createElement('li');
        line.textContent = item;
        list.appendChild(line);
    });
    return list;
}

function createCardLinks(card) {
    const links = Array.isArray(card.links) ? card.links.filter((item) => item?.href) : [];
    if (links.length === 0 && card.learnMore && card.learnMore !== '#') {
        links.push({ label: card.linkLabel ?? 'LEARN MORE', href: card.learnMore });
    }

    if (links.length === 0) {
        return null;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'card-links';

    links.forEach((item) => {
        const link = document.createElement('a');
        link.className = 'card-link';
        const variant = String(item.variant ?? '').trim().toLowerCase();
        if (variant) {
            link.classList.add(`is-${variant}`);
        }
        link.href = item.href;
        link.textContent = item.label || 'LINK';
        if (!String(item.href).startsWith('mailto:')) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }

        // GA4 Event Tracking
        link.addEventListener('click', () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'select_content',
                content_type: 'project_link',
                item_id: card.title || 'unknown_project',
                link_label: item.label,
                link_url: item.href
            });
        });

        wrapper.appendChild(link);
    });

    return wrapper;
}

function createServiceCard(card, sectionConfig) {
    const article = document.createElement('article');
    article.className = `service-card ${sectionConfig.cardClass ?? ''} ${card.cardClass ?? ''}`.trim();

    const visual = document.createElement('div');
    visual.className = 'card-visual';
    const visualHeight = card.visualHeight || sectionConfig.cardVisualHeight;
    if (visualHeight) {
        visual.style.setProperty('--card-visual-height', visualHeight);
    }

    const mermaidContainer = document.createElement('div');
    mermaidContainer.className = 'mermaid';
    mermaidContainer.setAttribute('data-mermaid-id', card.mermaidId ?? '');
    visual.appendChild(mermaidContainer);
    setYouTubeDataAttribute(visual, card);

    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = card.title ?? 'Card Title';

    const subtitleText = card.subtitle ?? card.period ?? '';
    const subtitle = document.createElement('p');
    subtitle.className = 'card-subtitle';
    subtitle.textContent = subtitleText;

    const description = document.createElement('p');
    description.className = 'card-desc';
    description.textContent = card.overview ?? card.description ?? '';

    const roleLine = createMetaLine('ROLE', card.role);
    const stackLine = createMetaLine('STACK', card.stackSummary);
    const tags = createTagList(card.skills);
    const highlights = createHighlightList(card.highlights);
    const links = createCardLinks(card);

    content.append(title);
    if (subtitleText) {
        content.append(subtitle);
    }
    content.append(description);
    if (roleLine) {
        content.append(roleLine);
    }
    if (stackLine) {
        content.append(stackLine);
    }
    if (tags) {
        content.append(tags);
    }
    if (highlights) {
        content.append(highlights);
    }
    if (links) {
        content.append(links);
    }
    article.append(visual, content);
    return article;
}

function renderServiceSections() {
    const container = byId('service-sections');
    if (!container) {
        return;
    }
    container.replaceChildren();

    const sections = Array.isArray(templateConfig.serviceSections) ? templateConfig.serviceSections : [];
    sections.forEach((sectionConfig) => {
        const sectionWrapper = document.createElement('section');
        sectionWrapper.className = 'service-section';
        sectionWrapper.id = sectionConfig.id ?? '';

        const header = document.createElement('div');
        header.className = 'section-header';
        const heading = document.createElement('h2');
        heading.className = 'section-title';
        heading.textContent = sectionConfig.title ?? 'SERVICES';
        header.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'service-grid';

        const groups = Array.isArray(sectionConfig.groups) && sectionConfig.groups.length > 0
            ? sectionConfig.groups
            : [{ title: '', desc: '', cards: sectionConfig.cards ?? [] }];

        groups.forEach((group) => {
            if (group.title || group.desc) {
                grid.appendChild(createGroupDivider(group, sectionConfig.theme));
            }

            const cards = Array.isArray(group.cards) ? group.cards : [];
            cards.forEach((card) => {
                grid.appendChild(createServiceCard(card, sectionConfig));
            });
        });

        sectionWrapper.append(header, grid);
        container.appendChild(sectionWrapper);
    });
}

function renderContact() {
    const contact = templateConfig.contact ?? {};
    const section = byId('contact');
    const actions = byId('contact-actions');

    if (section && contact.sectionId) {
        section.id = contact.sectionId;
    }
    setText('contact-panel-title', contact.panelTitle);
    setText('contact-panel-uid', contact.panelUid);
    setText('contact-description', contact.description);

    if (!actions) {
        return;
    }
    actions.replaceChildren();

    const items = Array.isArray(contact.actions) ? contact.actions : [];
    items.forEach((item) => {
        const action = document.createElement('a');
        action.className = 'action-btn';
        action.href = item.href || '#';
        action.textContent = item.label || 'LINK';
        if (!String(item.href || '').startsWith('mailto:')) {
            action.target = '_blank';
            action.rel = 'noopener noreferrer';
        }
        actions.appendChild(action);
    });
}

function buildDefaultNavigation() {
    const items = [];

    const hero = templateConfig.hero ?? {};
    const skills = templateConfig.skills ?? {};
    const contact = templateConfig.contact ?? {};

    items.push({
        label: hero.panelTitle || 'SYSTEM_ARCHITECTURE',
        target: normalizeHashTarget(hero.sectionId || 'system-architecture')
    });

    const topPanels = Array.isArray(templateConfig.topPanels) ? templateConfig.topPanels : [];
    const serviceSections = Array.isArray(templateConfig.serviceSections) ? templateConfig.serviceSections : [];

    serviceSections.forEach((section) => {
        items.push({
            label: section.navLabel || section.title || section.id || 'SERVICES',
            target: normalizeHashTarget(section.id || '')
        });
    });

    topPanels.forEach((panel, index) => {
        items.push({
            label: panel.navLabel || panel.panelTitle || `TOP_PANEL_${index + 1}`,
            target: normalizeHashTarget(panel.sectionId || `top-panel-${index + 1}`)
        });
    });

    items.push({
        label: skills.panelTitle || 'SKILL_SET',
        target: normalizeHashTarget(skills.sectionId || 'skill-set')
    });

    items.push({
        label: contact.panelTitle || 'CONTACT',
        target: normalizeHashTarget(contact.sectionId || 'contact')
    });

    return items;
}

function renderNavigation() {
    const nav = byId('header-nav');
    if (!nav) {
        return;
    }
    nav.replaceChildren();

    const configuredNav = Array.isArray(templateConfig.navigation) && templateConfig.navigation.length > 0
        ? templateConfig.navigation
        : buildDefaultNavigation();

    configuredNav.forEach((item) => {
        const link = document.createElement('a');
        link.className = 'nav-item';
        link.href = normalizeHashTarget(item.target);
        link.textContent = item.label || 'SECTION';
        nav.appendChild(link);
    });
}

function setupScrollSpy() {
    const nav = byId('header-nav');
    if (!nav) {
        return;
    }

    const links = Array.from(nav.querySelectorAll('.nav-item, .nav-sub-item'));
    if (links.length === 0) {
        return;
    }

    const targetMap = new Map();
    links.forEach((link) => {
        const href = String(link.getAttribute('href') || '');
        if (!href.startsWith('#') || href.length < 2) {
            return;
        }

        const targetId = href.slice(1);
        const targetElement = byId(targetId);
        if (!targetElement) {
            return;
        }

        if (!targetMap.has(targetId)) {
            targetMap.set(targetId, {
                element: targetElement,
                links: []
            });
        }
        targetMap.get(targetId).links.push(link);
    });

    if (targetMap.size === 0) {
        return;
    }

    let sortedTargets = [];
    let currentActiveId = '';
    let rafToken = 0;

    const clearActive = () => {
        links.forEach((link) => link.classList.remove('is-active'));
    };

    const activateTarget = (targetId) => {
        if (!targetId || currentActiveId === targetId) {
            return;
        }
        currentActiveId = targetId;
        clearActive();

        const matched = targetMap.get(targetId);
        if (!matched) {
            return;
        }

        matched.links.forEach((link) => link.classList.add('is-active'));
    };

    const rebuildTargetOrder = () => {
        sortedTargets = Array.from(targetMap.entries())
            .map(([targetId, payload]) => ({
                targetId,
                top: payload.element.getBoundingClientRect().top + window.scrollY
            }))
            .sort((left, right) => left.top - right.top);
    };

    const applyByScrollPosition = () => {
        if (sortedTargets.length === 0) {
            return;
        }

        const headerHeight = document.querySelector('.status-bar')?.offsetHeight ?? 0;
        const baseline = window.scrollY + headerHeight + 28;
        let activeId = sortedTargets[0].targetId;

        for (let index = 0; index < sortedTargets.length; index += 1) {
            if (baseline >= sortedTargets[index].top) {
                activeId = sortedTargets[index].targetId;
            } else {
                break;
            }
        }

        activateTarget(activeId);
    };

    const scheduleUpdate = () => {
        if (rafToken !== 0) {
            return;
        }
        rafToken = window.requestAnimationFrame(() => {
            rafToken = 0;
            applyByScrollPosition();
        });
    };

    rebuildTargetOrder();
    applyByScrollPosition();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', () => {
        rebuildTargetOrder();
        scheduleUpdate();
    });
    window.addEventListener('hashchange', scheduleUpdate);

    window.setTimeout(() => {
        rebuildTargetOrder();
        scheduleUpdate();
    }, 160);
    window.setTimeout(() => {
        rebuildTargetOrder();
        scheduleUpdate();
    }, 720);
}

function injectMermaidSources() {
    const nodes = Array.from(document.querySelectorAll('.mermaid'));
    const diagrams = templateConfig.diagrams ?? {};

    nodes.forEach((container) => {
        const mermaidId = container.getAttribute('data-mermaid-id') || '';
        if (mermaidId && diagrams[mermaidId]) {
            container.innerHTML = diagrams[mermaidId];
            return;
        }

        const label = toSafeLabel(mermaidId || 'undefined_id');
        container.innerHTML = `
            graph TD
            A[${label}] --> B[Define templateConfig.diagrams entry]
        `;
    });

    return nodes;
}

function setupMermaidModal() {
    const modal = byId('mermaid-modal');
    const modalContent = byId('mermaid-modal-content');
    const modalTitle = byId('mermaid-modal-title');
    const modalDialog = modal?.querySelector('.mermaid-modal-dialog') ?? null;

    if (!modal || !modalContent || !modalTitle || !modalDialog) {
        return;
    }

    const targets = document.querySelectorAll('.graph-container, .card-visual');
    const ZOOM_STEP = 0.15;
    const ZOOM_MIN = 0.55;
    const ZOOM_MAX = 3;

    let zoom = 1;
    let activeSvg = null;
    let activeCanvas = null;
    let activeViewport = null;
    let baseSvgWidth = 0;
    let baseSvgHeight = 0;
    let isPanning = false;
    let panStartX = 0;
    let panStartY = 0;
    let panStartScrollLeft = 0;
    let panStartScrollTop = 0;

    let controls = modal.querySelector('.mermaid-modal-controls');
    if (!controls) {
        controls = document.createElement('div');
        controls.className = 'mermaid-modal-controls';
        controls.innerHTML = `
            <button class="mermaid-zoom-btn" type="button" data-mermaid-zoom="out" aria-label="Zoom out">-</button>
            <button class="mermaid-zoom-btn" type="button" data-mermaid-zoom="reset" aria-label="Reset zoom">RESET</button>
            <button class="mermaid-zoom-btn" type="button" data-mermaid-zoom="in" aria-label="Zoom in">+</button>
            <span class="mermaid-zoom-value" aria-live="polite">100%</span>
        `;
        modalDialog.appendChild(controls);
    }

    const zoomValue = controls.querySelector('.mermaid-zoom-value');

    const centerModalView = () => {
        if (!(activeViewport instanceof HTMLElement)) {
            return;
        }

        const maxLeft = activeViewport.scrollWidth - activeViewport.clientWidth;
        activeViewport.scrollLeft = maxLeft > 0 ? Math.floor(maxLeft / 2) : 0;
    };

    const scheduleCenterModalView = () => {
        window.requestAnimationFrame(() => {
            centerModalView();
            window.requestAnimationFrame(centerModalView);
        });
    };

    const endPan = () => {
        if (!isPanning) {
            return;
        }
        isPanning = false;
        if (activeViewport) {
            activeViewport.classList.remove('is-panning');
        }
    };

    const applyZoom = () => {
        if (!activeSvg || !activeCanvas || !activeViewport) {
            return;
        }

        const nextWidth = Math.max(1, Math.round(baseSvgWidth * zoom));
        const nextHeight = Math.max(1, Math.round(baseSvgHeight * zoom));
        activeCanvas.style.width = `${nextWidth}px`;
        activeCanvas.style.height = `${nextHeight}px`;
        activeSvg.style.maxWidth = 'none';
        activeSvg.style.width = '100%';
        activeSvg.style.height = '100%';
        activeSvg.setAttribute('width', String(baseSvgWidth));
        activeSvg.setAttribute('height', String(baseSvgHeight));

        if (zoom > 1.001) {
            activeViewport.classList.add('can-pan');
        } else {
            endPan();
            activeViewport.classList.remove('can-pan');
        }

        if (zoomValue) {
            zoomValue.textContent = `${Math.round(zoom * 100)}%`;
        }
    };

    const setZoom = (nextZoom) => {
        const clampedZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, nextZoom));
        if (Math.abs(clampedZoom - zoom) < 0.0001) {
            return;
        }
        zoom = clampedZoom;
        applyZoom();
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        modalContent.replaceChildren();
        endPan();
        modalContent.classList.remove('has-linked-video');
        if (activeViewport) {
            activeViewport.classList.remove('can-pan');
        }
        activeSvg = null;
        activeCanvas = null;
        activeViewport = null;
        baseSvgWidth = 0;
        baseSvgHeight = 0;
        zoom = 1;
        if (zoomValue) {
            zoomValue.textContent = '100%';
        }
        document.body.classList.remove('modal-open');
    };

    const setupHoverPreview = (target, videoId) => {
        if (!videoId || target.querySelector('.youtube-hover-preview')) {
            return;
        }

        target.classList.add('has-youtube-preview');

        const preview = document.createElement('div');
        preview.className = 'youtube-hover-preview';
        preview.setAttribute('aria-hidden', 'true');

        const iframe = document.createElement('iframe');
        iframe.className = 'youtube-hover-frame';
        iframe.title = 'Linked YouTube Preview';
        iframe.loading = 'lazy';
        iframe.tabIndex = -1;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.setAttribute('allowfullscreen', '');
        preview.appendChild(iframe);

        const hint = document.createElement('span');
        hint.className = 'youtube-hover-hint';
        hint.textContent = 'HOVER PREVIEW · CLICK PLAY';
        preview.appendChild(hint);

        target.appendChild(preview);

        let previewLoaded = false;
        const ensurePreviewLoaded = () => {
            if (previewLoaded) {
                return;
            }
            iframe.src = buildYouTubeEmbedUrl(videoId, {
                autoplay: true,
                mute: true,
                controls: false,
                loop: true
            });
            previewLoaded = true;
        };

        target.addEventListener('mouseenter', ensurePreviewLoaded);
        target.addEventListener('focusin', ensurePreviewLoaded);
        target.addEventListener('touchstart', ensurePreviewLoaded, { passive: true, once: true });
    };

    const openModal = (target) => {
        const sourceSvg = target.querySelector('.mermaid svg');
        if (!sourceSvg) {
            return;
        }
        const videoId = target.getAttribute('data-youtube-video-id') || '';

        const clonedSvg = sourceSvg.cloneNode(true);
        clonedSvg.style.maxWidth = 'none';
        clonedSvg.style.width = '100%';
        clonedSvg.style.height = '100%';

        const viewBox = sourceSvg.getAttribute('viewBox');
        let calculatedBaseWidth = 0;
        let calculatedBaseHeight = 0;
        if (viewBox) {
            const parts = viewBox.trim().split(/\s+/).map(Number);
            if (parts.length === 4 && parts.every(Number.isFinite)) {
                const modalBaseScale = 1.08;
                calculatedBaseWidth = Math.round(parts[2] * modalBaseScale);
                calculatedBaseHeight = Math.round(parts[3] * modalBaseScale);
            }
        }

        if (calculatedBaseWidth <= 0 || calculatedBaseHeight <= 0) {
            const rect = sourceSvg.getBoundingClientRect();
            const modalBaseScale = 1.08;
            calculatedBaseWidth = Math.max(1, Math.round(rect.width * modalBaseScale));
            calculatedBaseHeight = Math.max(1, Math.round(rect.height * modalBaseScale));
        }

        baseSvgWidth = calculatedBaseWidth;
        baseSvgHeight = calculatedBaseHeight;

        clonedSvg.setAttribute('width', String(baseSvgWidth));
        clonedSvg.setAttribute('height', String(baseSvgHeight));

        const canvas = document.createElement('div');
        canvas.className = 'mermaid-modal-canvas';
        canvas.style.width = `${baseSvgWidth}px`;
        canvas.style.height = `${baseSvgHeight}px`;
        canvas.appendChild(clonedSvg);

        const layout = document.createElement('div');
        layout.className = 'mermaid-modal-layout';

        const diagramPane = document.createElement('section');
        diagramPane.className = 'mermaid-modal-panel mermaid-modal-panel-diagram mermaid-modal-diagram-pane';
        const diagramHeader = document.createElement('div');
        diagramHeader.className = 'mermaid-modal-panel-header';
        diagramHeader.innerHTML = '<span>DIAGRAM</span><span>CTRL/CMD + WHEEL TO ZOOM</span>';

        const diagramBody = document.createElement('div');
        diagramBody.className = 'mermaid-modal-panel-body mermaid-modal-panel-body-diagram';
        const diagramViewport = document.createElement('div');
        diagramViewport.className = 'mermaid-modal-diagram-viewport';
        diagramViewport.appendChild(canvas);
        diagramBody.appendChild(diagramViewport);

        diagramPane.append(diagramHeader, diagramBody);
        layout.appendChild(diagramPane);

        if (videoId) {
            const videoPane = document.createElement('section');
            videoPane.className = 'mermaid-modal-panel mermaid-modal-panel-video mermaid-modal-video-pane';
            const videoHeader = document.createElement('div');
            videoHeader.className = 'mermaid-modal-panel-header';
            videoHeader.innerHTML = '<span>YOUTUBE</span><span>LINKED PLAYBACK</span>';

            const videoBody = document.createElement('div');
            videoBody.className = 'mermaid-modal-panel-body mermaid-modal-panel-body-video';
            const videoWrap = document.createElement('div');
            videoWrap.className = 'mermaid-modal-video-wrap';

            const videoFrame = document.createElement('iframe');
            videoFrame.className = 'mermaid-modal-video';
            videoFrame.title = 'Linked YouTube Video';
            videoFrame.loading = 'eager';
            videoFrame.referrerPolicy = 'strict-origin-when-cross-origin';
            videoFrame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            videoFrame.setAttribute('allowfullscreen', '');
            videoFrame.src = buildYouTubeEmbedUrl(videoId, {
                autoplay: true,
                mute: false,
                controls: true,
                loop: false
            });

            videoWrap.appendChild(videoFrame);
            videoBody.appendChild(videoWrap);
            videoPane.append(videoHeader, videoBody);
            layout.appendChild(videoPane);
            modalContent.classList.add('has-linked-video');
        } else {
            modalContent.classList.remove('has-linked-video');
        }

        modalContent.replaceChildren(layout);
        modalContent.scrollLeft = 0;
        modalContent.scrollTop = 0;
        activeCanvas = canvas;
        activeSvg = clonedSvg;
        activeViewport = diagramViewport;
        zoom = 1;
        applyZoom();

        const titleText =
            target.closest('.service-card')?.querySelector('.card-title')?.textContent?.trim() ||
            target.closest('.hero-panel')?.querySelector('.panel-title')?.textContent?.trim() ||
            'Mermaid Diagram';
        modalTitle.textContent = titleText;

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        scheduleCenterModalView();
    };

    controls.querySelectorAll('[data-mermaid-zoom]').forEach((button) => {
        button.addEventListener('click', (event) => {
            const control = event.currentTarget;
            if (!(control instanceof HTMLElement)) {
                return;
            }
            const action = control.getAttribute('data-mermaid-zoom');
            if (!action || !modal.classList.contains('is-open')) {
                return;
            }

            if (action === 'in') {
                setZoom(zoom + ZOOM_STEP);
                return;
            }
            if (action === 'out') {
                setZoom(zoom - ZOOM_STEP);
                return;
            }
            zoom = 1;
            applyZoom();
            scheduleCenterModalView();
        });
    });

    modalContent.addEventListener('wheel', (event) => {
        if (!modal.classList.contains('is-open') || !activeSvg || !activeViewport || !event.ctrlKey) {
            return;
        }
        const eventTarget = event.target;
        if (!(eventTarget instanceof Node) || !activeViewport.contains(eventTarget)) {
            return;
        }
        event.preventDefault();
        if (event.deltaY < 0) {
            setZoom(zoom + ZOOM_STEP);
            return;
        }
        setZoom(zoom - ZOOM_STEP);
    }, { passive: false });

    modalContent.addEventListener('pointerdown', (event) => {
        if (!modal.classList.contains('is-open') || !activeSvg || !activeViewport || zoom <= 1.001) {
            return;
        }
        if (event.button !== 0) {
            return;
        }
        const eventTarget = event.target;
        if (!(eventTarget instanceof Element)) {
            return;
        }
        if (!activeViewport.contains(eventTarget)) {
            return;
        }
        isPanning = true;
        panStartX = event.clientX;
        panStartY = event.clientY;
        panStartScrollLeft = activeViewport.scrollLeft;
        panStartScrollTop = activeViewport.scrollTop;
        activeViewport.classList.add('is-panning');
        event.preventDefault();
    });

    modalContent.addEventListener('pointermove', (event) => {
        if (!isPanning || !activeViewport) {
            return;
        }
        const deltaX = event.clientX - panStartX;
        const deltaY = event.clientY - panStartY;
        activeViewport.scrollLeft = panStartScrollLeft - deltaX;
        activeViewport.scrollTop = panStartScrollTop - deltaY;
        event.preventDefault();
    });

    modalContent.addEventListener('pointerup', endPan);
    modalContent.addEventListener('pointercancel', endPan);
    modalContent.addEventListener('pointerleave', (event) => {
        if (isPanning && !(event.buttons & 1)) {
            endPan();
        }
    });

    targets.forEach((target) => {
        target.classList.add('mermaid-zoom-target');
        target.setAttribute('tabindex', '0');
        target.setAttribute('role', 'button');
        const videoId = target.getAttribute('data-youtube-video-id') || '';
        if (videoId) {
            target.setAttribute('aria-label', 'Open expanded Mermaid diagram and play linked YouTube video');
            setupHoverPreview(target, videoId);
        } else {
            target.setAttribute('aria-label', 'Open expanded Mermaid diagram');
        }

        target.addEventListener('click', () => openModal(target));
        target.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(target);
            }
        });
    });

    modal.querySelectorAll('[data-mermaid-close]').forEach((closeButton) => {
        closeButton.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('is-open')) {
            return;
        }
        if (event.key === 'Escape') {
            closeModal();
            return;
        }
        if (event.key === '+' || event.key === '=') {
            event.preventDefault();
            setZoom(zoom + ZOOM_STEP);
            return;
        }
        if (event.key === '-' || event.key === '_') {
            event.preventDefault();
            setZoom(zoom - ZOOM_STEP);
            return;
        }
        if (event.key === '0') {
            event.preventDefault();
            zoom = 1;
            applyZoom();
            scheduleCenterModalView();
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    setSystemInfo();
    renderHero();
    renderServiceSections();
    renderTopPanels();
    renderSkills();
    renderContact();
    renderNavigation();
    setupUptime();
    setupMobileNav();

    const mermaidNodes = injectMermaidSources();
    for (let index = 0; index < mermaidNodes.length; index += 1) {
        const node = mermaidNodes[index];
        const tempClass = `mermaid-render-target-${index}`;
        node.classList.add(tempClass);
        try {
            await mermaid.run({ querySelector: `.${tempClass}` });
        } catch (error) {
            console.error('Mermaid render failed for node:', node, error);
            const failedId = node.getAttribute('data-mermaid-id') || 'unknown';
            node.innerHTML = `<p style="margin:0;color:#ffb4b4;">Diagram render failed: ${failedId}</p>`;
        } finally {
            node.classList.remove(tempClass);
        }
    }

    setupMermaidModal();
    setupScrollSpy();
});
