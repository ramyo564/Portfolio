import { byId, normalizeHashTarget } from './utils/dom.js';
import { trackSelectContent } from './analytics/tracking.js';

function buildDefaultNavigation(templateConfig) {
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

export function renderNavigation(templateConfig) {
    const nav = byId('header-nav');
    if (!nav) {
        return;
    }
    nav.replaceChildren();

    const configuredNav = Array.isArray(templateConfig.navigation) && templateConfig.navigation.length > 0
        ? templateConfig.navigation
        : buildDefaultNavigation(templateConfig);

    configuredNav.forEach((item) => {
        const link = document.createElement('a');
        link.className = 'nav-item';
        link.href = normalizeHashTarget(item.target);
        link.textContent = item.label || 'SECTION';

        link.addEventListener('click', () => {
            const normalizedTarget = normalizeHashTarget(item.target);
            const targetId = normalizedTarget.replace(/^#/, '') || 'navigation_target';
            trackSelectContent({
                contentType: 'navigation',
                itemId: targetId,
                itemName: item.label || 'SECTION',
                sectionName: 'header_nav',
                interactionAction: 'navigate',
                elementType: 'link',
                elementLabel: item.label || 'SECTION',
                linkUrl: normalizedTarget,
                linkType: 'anchor',
                nav_label: item.label || 'SECTION',
                nav_target: normalizedTarget
            });
        });

        nav.appendChild(link);
    });
}

export function setupScrollSpy() {
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

        trackSelectContent({
            contentType: 'section_view',
            itemId: targetId,
            itemName: targetId,
            sectionName: 'scroll_spy',
            interactionAction: 'view',
            elementType: 'section',
            elementLabel: targetId,
            section_id: targetId
        });
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
