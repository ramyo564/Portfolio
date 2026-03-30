import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
import { templateConfig } from './config.js';

import { setText } from './js/utils/dom.js';
import { setupAnalyticsLifecycle } from './js/analytics/tracking.js';
import { setupUptime, setupMobileNav } from './js/ui/shell.js';
import { renderHero, renderTopPanels } from './js/render/hero.js';
import { renderServiceSections, revealHashTarget } from './js/render/services/index.js';
import { renderSkills } from './js/render/skills.js';
import { renderContact } from './js/render/contact.js';
import { renderNavigation, setupScrollSpy } from './js/navigation.js';
import {
    initializeMermaid,
    injectMermaidSources,
    renderMermaidNodes,
    setupMermaidModal
} from './js/mermaid/index.js';

initializeMermaid(mermaid, templateConfig);

function setSystemInfo() {
    if (templateConfig.system?.documentTitle) {
        document.title = templateConfig.system.documentTitle;
    }
    setText('system-name', templateConfig.system?.systemName);
}

document.addEventListener('DOMContentLoaded', async () => {
    setSystemInfo();
    setupAnalyticsLifecycle();
    renderHero(templateConfig);
    renderServiceSections(templateConfig);
    renderTopPanels(templateConfig);
    renderSkills(templateConfig);
    renderContact(templateConfig);
    renderNavigation(templateConfig);
    setupUptime();
    setupMobileNav();

    const mermaidNodes = injectMermaidSources(templateConfig);
    await renderMermaidNodes(mermaid, mermaidNodes);

    setupMermaidModal();
    setupScrollSpy();

    if (window.location.hash) {
        revealHashTarget(window.location.hash, 'initial_hash');
    }

    window.addEventListener('hashchange', () => {
        revealHashTarget(window.location.hash, 'hash_change');
    });
});
